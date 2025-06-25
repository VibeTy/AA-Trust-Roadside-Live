import { 
  users, 
  contactSubmissions, 
  quoteSubmissions, 
  bookingSubmissions,
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContactSubmission, 
  type QuoteSubmission, 
  type InsertQuoteSubmission,
  type BookingSubmission,
  type InsertBookingSubmission,
  type PageView,
  type InsertPageView,
  type TrafficStats
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createQuoteSubmission(submission: InsertQuoteSubmission): Promise<QuoteSubmission>;
  getQuoteSubmissions(): Promise<QuoteSubmission[]>;
  updateQuoteContacted(id: number, contacted: boolean): Promise<QuoteSubmission | undefined>;
  createBookingSubmission(submission: InsertBookingSubmission): Promise<BookingSubmission>;
  getBookingSubmissions(): Promise<BookingSubmission[]>;
  updateBookingContacted(id: number, contacted: boolean): Promise<BookingSubmission | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private quoteSubmissions: Map<number, QuoteSubmission>;
  private bookingSubmissions: Map<number, BookingSubmission>;
  private currentUserId: number;
  private currentSubmissionId: number;
  private currentQuoteId: number;
  private currentBookingId: number;

  private passwordResetTokens: PasswordResetToken[] = [];
  private resetTokenIdCounter = 1;

  // Analytics storage
  private pageViews: PageView[] = [];
  private currentPageViewId = 1;
  private activeSessions = new Map<string, { startTime: Date, lastActivity: Date, pages: string[] }>();

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.quoteSubmissions = new Map();
    this.bookingSubmissions = new Map();
    this.currentUserId = 1;
    this.currentSubmissionId = 1;
    this.currentQuoteId = 1;
    this.currentBookingId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentSubmissionId++;
    const submission: ContactSubmission = {
      id,
      name: insertSubmission.name,
      email: insertSubmission.email ?? null,
      phone: insertSubmission.phone,
      location: insertSubmission.location,
      urgency: insertSubmission.urgency,
      message: insertSubmission.message,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createQuoteSubmission(insertSubmission: InsertQuoteSubmission): Promise<QuoteSubmission> {
    const id = this.currentQuoteId++;
    const submission: QuoteSubmission = {
      id,
      name: insertSubmission.name,
      phone: insertSubmission.phone,
      email: insertSubmission.email ?? null,
      location: insertSubmission.location,
      serviceType: insertSubmission.serviceType,
      vehicleInfo: insertSubmission.vehicleInfo ?? null,
      urgency: insertSubmission.urgency,
      description: insertSubmission.description,
      contacted: false,
      createdAt: new Date(),
    };
    this.quoteSubmissions.set(id, submission);
    return submission;
  }

  async getQuoteSubmissions(): Promise<QuoteSubmission[]> {
    return Array.from(this.quoteSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateQuoteContacted(id: number, contacted: boolean): Promise<QuoteSubmission | undefined> {
    const quote = this.quoteSubmissions.get(id);
    if (quote) {
      quote.contacted = contacted;
      this.quoteSubmissions.set(id, quote);
      return quote;
    }
    return undefined;
  }

  async createBookingSubmission(insertSubmission: InsertBookingSubmission): Promise<BookingSubmission> {
    const id = this.currentBookingId++;
    const submission: BookingSubmission = {
      id,
      name: insertSubmission.name,
      phone: insertSubmission.phone,
      email: insertSubmission.email ?? null,
      location: insertSubmission.location,
      serviceType: insertSubmission.serviceType,
      vehicleInfo: insertSubmission.vehicleInfo ?? null,
      preferredDate: insertSubmission.preferredDate,
      preferredTime: insertSubmission.preferredTime,
      message: insertSubmission.message,
      contacted: false,
      createdAt: new Date(),
    };
    this.bookingSubmissions.set(id, submission);
    return submission;
  }

  async getBookingSubmissions(): Promise<BookingSubmission[]> {
    return Array.from(this.bookingSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateBookingContacted(id: number, contacted: boolean): Promise<BookingSubmission | undefined> {
    const booking = this.bookingSubmissions.get(id);
    if (booking) {
      booking.contacted = contacted;
      this.bookingSubmissions.set(id, booking);
      return booking;
    }
    return undefined;
  }

  // Analytics methods
  async trackPageView(sessionId: string, page: string, userAgent?: string, referrer?: string): Promise<PageView> {
    const pageView: PageView = {
      id: this.currentPageViewId++,
      page,
      userAgent,
      referrer,
      sessionId,
      timestamp: new Date(),
      location: this.getLocationFromUserAgent(userAgent) // Simplified for demo
    };

    this.pageViews.push(pageView);

    // Update session tracking
    if (!this.activeSessions.has(sessionId)) {
      this.activeSessions.set(sessionId, {
        startTime: new Date(),
        lastActivity: new Date(),
        pages: [page]
      });
    } else {
      const session = this.activeSessions.get(sessionId)!;
      session.lastActivity = new Date();
      if (!session.pages.includes(page)) {
        session.pages.push(page);
      }
    }

    return pageView;
  }

  async endSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      const duration = (session.lastActivity.getTime() - session.startTime.getTime()) / 1000;
      // Update page views with session duration
      this.pageViews
        .filter(pv => pv.sessionId === sessionId)
        .forEach(pv => pv.duration = duration / session.pages.length);

      this.activeSessions.delete(sessionId);
    }
  }

  async getTrafficStats(): Promise<TrafficStats> {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentViews = this.pageViews.filter(pv => pv.timestamp >= last24Hours);
    const uniqueVisitors = new Set(recentViews.map(pv => pv.sessionId)).size;

    // Calculate hourly data
    const hourlyData = [];
    for (let i = 23; i >= 0; i--) {
      const hourStart = new Date(now.getTime() - i * 60 * 60 * 1000);
      hourStart.setMinutes(0, 0, 0);
      const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);

      const hourViews = recentViews.filter(pv => 
        pv.timestamp >= hourStart && pv.timestamp < hourEnd
      );

      hourlyData.push({
        hour: hourStart.toISOString(),
        visitors: new Set(hourViews.map(pv => pv.sessionId)).size,
        pageViews: hourViews.length
      });
    }

    // Top pages
    const pageCount = new Map<string, number>();
    recentViews.forEach(pv => {
      pageCount.set(pv.page, (pageCount.get(pv.page) || 0) + 1);
    });

    const topPages = Array.from(pageCount.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Location data (simplified)
    const locationCount = new Map<string, number>();
    recentViews.forEach(pv => {
      const country = pv.location?.country || 'Unknown';
      locationCount.set(country, (locationCount.get(country) || 0) + 1);
    });

    const locationData = Array.from(locationCount.entries())
      .map(([country, visitors]) => ({ country, visitors }))
      .sort((a, b) => b.visitors - a.visitors);

    // Average session duration
    const completedSessions = this.pageViews
      .filter(pv => pv.duration !== undefined)
      .map(pv => pv.duration!);
    const avgSessionDuration = completedSessions.length > 0 
      ? completedSessions.reduce((a, b) => a + b, 0) / completedSessions.length 
      : 0;

    return {
      activeUsers: this.activeSessions.size,
      totalPageViews: recentViews.length,
      uniqueVisitors,
      avgSessionDuration,
      topPages,
      hourlyData,
      locationData
    };
  }

  private getLocationFromUserAgent(userAgent?: string): { country?: string; region?: string; city?: string } | undefined {
    // Simplified location detection - in production you'd use a proper IP geolocation service
    if (!userAgent) return undefined;

    // Simple demo data based on common patterns
    if (userAgent.includes('Mobile')) {
      return { country: 'United States', region: 'Florida', city: 'Orlando' };
    }
    return { country: 'United States', region: 'Florida', city: 'Jacksonville' };
  }
}

export const storage = new MemStorage();
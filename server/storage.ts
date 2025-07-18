import { 
  users, 
  contactSubmissions, 
  quoteSubmissions, 
  bookingSubmissions,
  smartAnalyzerSubmissions,
  callTracking,
  jobTracking,
  websiteAnalytics,
  chatbotInteractions,
  marketingMetrics,
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContactSubmission, 
  type QuoteSubmission, 
  type InsertQuoteSubmission,
  type BookingSubmission,
  type InsertBookingSubmission,
  type SmartAnalyzerSubmission,
  type InsertSmartAnalyzerSubmission,
  type CallTracking,
  type InsertCallTracking,
  type JobTracking,
  type InsertJobTracking,
  type WebsiteAnalytics,
  type InsertWebsiteAnalytics,
  type ChatbotInteraction,
  type InsertChatbotInteraction,
  type MarketingMetrics,
  type InsertMarketingMetrics,
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
  createSmartAnalyzerSubmission(submission: InsertSmartAnalyzerSubmission): Promise<SmartAnalyzerSubmission>;
  getSmartAnalyzerSubmissions(): Promise<SmartAnalyzerSubmission[]>;
  updateSmartAnalyzerContacted(id: number, contacted: boolean): Promise<SmartAnalyzerSubmission | undefined>;
  getTrafficStats(): Promise<TrafficStats>;
  
  // New analytics tracking methods
  createCallTracking(tracking: InsertCallTracking): Promise<CallTracking>;
  getCallTracking(): Promise<CallTracking[]>;
  createJobTracking(job: InsertJobTracking): Promise<JobTracking>;
  getJobTracking(): Promise<JobTracking[]>;
  createWebsiteAnalytics(analytics: InsertWebsiteAnalytics): Promise<WebsiteAnalytics>;
  getWebsiteAnalytics(): Promise<WebsiteAnalytics[]>;
  createChatbotInteraction(interaction: InsertChatbotInteraction): Promise<ChatbotInteraction>;
  getChatbotInteractions(): Promise<ChatbotInteraction[]>;
  createMarketingMetrics(metrics: InsertMarketingMetrics): Promise<MarketingMetrics>;
  getMarketingMetrics(): Promise<MarketingMetrics[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private quoteSubmissions: Map<number, QuoteSubmission>;
  private bookingSubmissions: Map<number, BookingSubmission>;
  private smartAnalyzerSubmissions: Map<number, SmartAnalyzerSubmission>;
  private currentUserId: number;
  private currentSubmissionId: number;
  private currentQuoteId: number;
  private currentBookingId: number;
  private currentSmartAnalyzerId: number;

  // Analytics storage
  private callTracking: Map<number, CallTracking>;
  private jobTracking: Map<number, JobTracking>;
  private websiteAnalytics: Map<number, WebsiteAnalytics>;
  private chatbotInteractions: Map<number, ChatbotInteraction>;
  private marketingMetrics: Map<number, MarketingMetrics>;
  private currentCallTrackingId: number;
  private currentJobTrackingId: number;
  private currentWebsiteAnalyticsId: number;
  private currentChatbotInteractionId: number;
  private currentMarketingMetricsId: number;

  private pageViews: PageView[] = [];
  private currentPageViewId = 1;
  private activeSessions = new Map<string, { startTime: Date, lastActivity: Date, pages: string[] }>();

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.quoteSubmissions = new Map();
    this.bookingSubmissions = new Map();
    this.smartAnalyzerSubmissions = new Map();
    this.callTracking = new Map();
    this.jobTracking = new Map();
    this.websiteAnalytics = new Map();
    this.chatbotInteractions = new Map();
    this.marketingMetrics = new Map();
    this.currentUserId = 1;
    this.currentSubmissionId = 1;
    this.currentQuoteId = 1;
    this.currentBookingId = 1;
    this.currentSmartAnalyzerId = 1;
    this.currentCallTrackingId = 1;
    this.currentJobTrackingId = 1;
    this.currentWebsiteAnalyticsId = 1;
    this.currentChatbotInteractionId = 1;
    this.currentMarketingMetricsId = 1;
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
    const user: User = { 
      ...insertUser, 
      id,
      email: insertUser.email ?? null,
      resetToken: null,
      resetTokenExpiry: null,
      createdAt: new Date()
    };
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

  async updateQuote(id: number, updateData: Partial<QuoteSubmission>): Promise<QuoteSubmission | undefined> {
    const quote = this.quoteSubmissions.get(id);
     if (quote) {
      Object.assign(quote, updateData);
      this.quoteSubmissions.set(id, quote);
      return quote;
    }
    return undefined;
  }

  async deleteQuote(id: number): Promise<QuoteSubmission | undefined> {
    const quote = this.quoteSubmissions.get(id);
    if (quote) {
      this.quoteSubmissions.delete(id);
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
      vehicleType: insertSubmission.vehicleType,
      serviceNeeded: insertSubmission.serviceNeeded,
      urgency: insertSubmission.urgency,
      description: insertSubmission.description,
      preferredDate: insertSubmission.preferredDate ?? null,
      preferredTime: insertSubmission.preferredTime ?? null,
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

  async createSmartAnalyzerSubmission(insertSubmission: InsertSmartAnalyzerSubmission): Promise<SmartAnalyzerSubmission> {
    const id = this.currentSmartAnalyzerId++;
    const submission: SmartAnalyzerSubmission = {
      id,
      name: insertSubmission.name ?? null,
      phone: insertSubmission.phone ?? null,
      email: insertSubmission.email ?? null,
      location: insertSubmission.location ?? null,
      problemDescription: insertSubmission.problemDescription,
      suggestedService: insertSubmission.suggestedService,
      estimatedPrice: insertSubmission.estimatedPrice,
      urgency: insertSubmission.urgency,
      confidence: insertSubmission.confidence,
      contacted: false,
      createdAt: new Date(),
    };
    this.smartAnalyzerSubmissions.set(id, submission);
    return submission;
  }

  async getSmartAnalyzerSubmissions(): Promise<SmartAnalyzerSubmission[]> {
    return Array.from(this.smartAnalyzerSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateSmartAnalyzerContacted(id: number, contacted: boolean): Promise<SmartAnalyzerSubmission | undefined> {
    const submission = this.smartAnalyzerSubmissions.get(id);
    if (submission) {
      submission.contacted = contacted;
      this.smartAnalyzerSubmissions.set(id, submission);
      return submission;
    }
    return undefined;
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

  isSessionActive(sessionId: string): boolean {
    return this.activeSessions.has(sessionId);
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

  // Call Tracking Methods
  async createCallTracking(tracking: InsertCallTracking): Promise<CallTracking> {
    const newTracking: CallTracking = {
      id: this.currentCallTrackingId++,
      sessionId: tracking.sessionId,
      phone: tracking.phone,
      source: tracking.source,
      page: tracking.page,
      userAgent: tracking.userAgent ?? null,
      ipAddress: tracking.ipAddress ?? null,
      createdAt: new Date()
    };
    this.callTracking.set(newTracking.id, newTracking);
    return newTracking;
  }

  async getCallTracking(): Promise<CallTracking[]> {
    return Array.from(this.callTracking.values());
  }

  // Job Tracking Methods
  async createJobTracking(job: InsertJobTracking): Promise<JobTracking> {
    const newJob: JobTracking = {
      id: this.currentJobTrackingId++,
      submissionId: job.submissionId ?? 0,
      submissionType: job.submissionType,
      status: job.status ?? 'pending',
      jobValue: job.jobValue ?? null,
      completedAt: job.completedAt ?? null,
      responseTime: job.responseTime ?? null,
      customerSatisfaction: job.customerSatisfaction ?? null,
      notes: job.notes ?? null,
      createdAt: new Date()
    };
    this.jobTracking.set(newJob.id, newJob);
    return newJob;
  }

  async getJobTracking(): Promise<JobTracking[]> {
    return Array.from(this.jobTracking.values());
  }

  // Website Analytics Methods
  async createWebsiteAnalytics(analytics: InsertWebsiteAnalytics): Promise<WebsiteAnalytics> {
    const newAnalytics: WebsiteAnalytics = {
      id: this.currentWebsiteAnalyticsId++,
      sessionId: analytics.sessionId,
      page: analytics.page,
      device: analytics.device,
      location: analytics.location ?? null,
      browser: analytics.browser ?? null,
      referrer: analytics.referrer ?? null,
      loadTime: analytics.loadTime ?? null,
      timeOnPage: analytics.timeOnPage ?? null,
      bounced: analytics.bounced ?? false,
      formStarted: analytics.formStarted ?? false,
      formCompleted: analytics.formCompleted ?? false,
      callButtonClicked: analytics.callButtonClicked ?? false,
      callButtonSource: analytics.callButtonSource ?? null,
      createdAt: new Date()
    };
    this.websiteAnalytics.set(newAnalytics.id, newAnalytics);
    return newAnalytics;
  }

  async getWebsiteAnalytics(): Promise<WebsiteAnalytics[]> {
    return Array.from(this.websiteAnalytics.values());
  }

  // Chatbot Interaction Methods
  async createChatbotInteraction(interaction: InsertChatbotInteraction): Promise<ChatbotInteraction> {
    const newInteraction: ChatbotInteraction = {
      id: this.currentChatbotInteractionId++,
      sessionId: interaction.sessionId,
      customerName: interaction.customerName ?? null,
      customerPhone: interaction.customerPhone ?? null,
      customerEmail: interaction.customerEmail ?? null,
      conversation: interaction.conversation,
      customerLocation: interaction.customerLocation ?? null,
      gpsLatitude: interaction.gpsLatitude ?? null,
      gpsLongitude: interaction.gpsLongitude ?? null,
      gpsAccuracy: interaction.gpsAccuracy ?? null,
      locationMethod: interaction.locationMethod ?? null,
      leadQuality: interaction.leadQuality ?? null,
      handoffToCall: interaction.handoffToCall ?? false,
      issueResolved: interaction.issueResolved ?? false,
      satisfaction: interaction.satisfaction ?? null,
      createdAt: new Date()
    };
    this.chatbotInteractions.set(newInteraction.id, newInteraction);
    return newInteraction;
  }

  async getChatbotInteractions(): Promise<ChatbotInteraction[]> {
    return Array.from(this.chatbotInteractions.values());
  }

  // Marketing Metrics Methods
  async createMarketingMetrics(metrics: InsertMarketingMetrics): Promise<MarketingMetrics> {
    const newMetrics: MarketingMetrics = {
      id: this.currentMarketingMetricsId++,
      sessionId: metrics.sessionId,
      source: metrics.source,
      medium: metrics.medium ?? null,
      campaign: metrics.campaign ?? null,
      conversionType: metrics.conversionType ?? null,
      conversionValue: metrics.conversionValue ?? null,
      customerAcquisitionCost: metrics.customerAcquisitionCost ?? null,
      createdAt: new Date()
    };
    this.marketingMetrics.set(newMetrics.id, newMetrics);
    return newMetrics;
  }

  async getMarketingMetrics(): Promise<MarketingMetrics[]> {
    return Array.from(this.marketingMetrics.values());
  }
}

export const storage = new MemStorage();
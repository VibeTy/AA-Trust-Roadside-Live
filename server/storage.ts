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
  type InsertBookingSubmission
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

  async createBookingSubmission(submission: InsertBookingSubmission): Promise<BookingSubmission> {
    const id = this.currentBookingId++;
    const submission: BookingSubmission = {
      id,
      name: submission.name,
      phone: submission.phone,
      email: submission.email ?? null,
      location: submission.location,
      serviceType: submission.serviceType,
      vehicleInfo: submission.vehicleInfo ?? null,
      preferredDate: submission.preferredDate,
      preferredTime: submission.preferredTime,
      message: submission.message,
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
}

export const storage = new MemStorage();
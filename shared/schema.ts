import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  resetToken: text("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  urgency: text("urgency").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quoteSubmissions = pgTable("quote_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  location: text("location").notNull(),
  serviceType: text("service_type").notNull(),
  vehicleInfo: text("vehicle_info"),
  urgency: text("urgency").notNull(),
  description: text("description").notNull(),
  contacted: boolean("contacted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookingSubmissions = pgTable("booking_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  vehicleType: text("vehicle_type").notNull(),
  location: text("location").notNull(),
  serviceNeeded: text("service_needed").notNull(),
  urgency: text("urgency").notNull(),
  description: text("description").notNull(),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  contacted: boolean("contacted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const smartAnalyzerSubmissions = pgTable("smart_analyzer_submissions", {
  id: serial("id").primaryKey(),
  name: text("name"),
  phone: text("phone"),
  email: text("email"),
  location: text("location"),
  problemDescription: text("problem_description").notNull(),
  suggestedService: text("suggested_service").notNull(),
  estimatedPrice: text("estimated_price").notNull(),
  urgency: text("urgency").notNull(),
  confidence: text("confidence").notNull(),
  contacted: boolean("contacted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Business Analytics & Tracking Tables
export const callTracking = pgTable("call_tracking", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  phone: text("phone").notNull(),
  source: text("source").notNull(), // 'hero', 'sticky', 'services', 'footer'
  page: text("page").notNull(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobTracking = pgTable("job_tracking", {
  id: serial("id").primaryKey(),
  submissionId: serial("submission_id").notNull(),
  submissionType: text("submission_type").notNull(), // 'quote', 'contact', 'booking'
  status: text("status").notNull().default('pending'), // 'pending', 'contacted', 'scheduled', 'completed', 'cancelled'
  jobValue: text("job_value"), // Store as text to handle currency formatting
  completedAt: timestamp("completed_at"),
  responseTime: text("response_time"), // Time to first contact
  customerSatisfaction: text("customer_satisfaction"), // 1-5 rating
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const websiteAnalytics = pgTable("website_analytics", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  page: text("page").notNull(),
  device: text("device").notNull(), // 'mobile', 'desktop', 'tablet'
  browser: text("browser"),
  location: text("location"), // city, state
  referrer: text("referrer"),
  loadTime: text("load_time"), // page load speed
  timeOnPage: text("time_on_page"), // seconds
  bounced: boolean("bounced").default(false),
  formStarted: boolean("form_started").default(false),
  formCompleted: boolean("form_completed").default(false),
  callButtonClicked: boolean("call_button_clicked").default(false),
  callButtonSource: text("call_button_source"), // which button was clicked
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chatbotInteractions = pgTable("chatbot_interactions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  customerEmail: text("customer_email"),
  conversation: text("conversation").notNull(), // JSON string of chat history
  leadQuality: text("lead_quality"), // 'hot', 'warm', 'cold'
  handoffToCall: boolean("handoff_to_call").default(false),
  issueResolved: boolean("issue_resolved").default(false),
  satisfaction: text("satisfaction"), // 1-5 rating
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const marketingMetrics = pgTable("marketing_metrics", {
  id: serial("id").primaryKey(),
  source: text("source").notNull(), // 'google', 'facebook', 'direct', 'referral'
  medium: text("medium"), // 'organic', 'cpc', 'social', 'email'
  campaign: text("campaign"),
  sessionId: text("session_id").notNull(),
  conversionType: text("conversion_type"), // 'form', 'call', 'chat'
  conversionValue: text("conversion_value"), // estimated value
  customerAcquisitionCost: text("customer_acquisition_cost"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  resetToken: true,
  resetTokenExpiry: true,
  createdAt: true,
});

export const registerUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Please enter a valid email"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteSubmissionSchema = createInsertSchema(quoteSubmissions).omit({
  id: true,
  createdAt: true,
  contacted: true,
});

export const insertBookingSubmissionSchema = createInsertSchema(bookingSubmissions).omit({
  id: true,
  createdAt: true,
  contacted: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertQuoteSubmission = z.infer<typeof insertQuoteSubmissionSchema>;
export type QuoteSubmission = typeof quoteSubmissions.$inferSelect;
export const insertSmartAnalyzerSubmissionSchema = createInsertSchema(smartAnalyzerSubmissions).omit({
  id: true,
  contacted: true,
  createdAt: true,
});

export const insertCallTrackingSchema = createInsertSchema(callTracking).omit({
  id: true,
  createdAt: true,
});

export const insertJobTrackingSchema = createInsertSchema(jobTracking).omit({
  id: true,
  createdAt: true,
});

export const insertWebsiteAnalyticsSchema = createInsertSchema(websiteAnalytics).omit({
  id: true,
  createdAt: true,
});

export const insertChatbotInteractionSchema = createInsertSchema(chatbotInteractions).omit({
  id: true,
  createdAt: true,
});

export const insertMarketingMetricsSchema = createInsertSchema(marketingMetrics).omit({
  id: true,
  createdAt: true,
});

export type InsertBookingSubmission = z.infer<typeof insertBookingSubmissionSchema>;
export type BookingSubmission = typeof bookingSubmissions.$inferSelect;
export type InsertSmartAnalyzerSubmission = z.infer<typeof insertSmartAnalyzerSubmissionSchema>;
export type SmartAnalyzerSubmission = typeof smartAnalyzerSubmissions.$inferSelect;
export type InsertCallTracking = z.infer<typeof insertCallTrackingSchema>;
export type CallTracking = typeof callTracking.$inferSelect;
export type InsertJobTracking = z.infer<typeof insertJobTrackingSchema>;
export type JobTracking = typeof jobTracking.$inferSelect;
export type InsertWebsiteAnalytics = z.infer<typeof insertWebsiteAnalyticsSchema>;
export type WebsiteAnalytics = typeof websiteAnalytics.$inferSelect;
export type InsertChatbotInteraction = z.infer<typeof insertChatbotInteractionSchema>;
export type ChatbotInteraction = typeof chatbotInteractions.$inferSelect;
export type InsertMarketingMetrics = z.infer<typeof insertMarketingMetricsSchema>;
export type MarketingMetrics = typeof marketingMetrics.$inferSelect;
// Analytics schemas
export const pageViewSchema = z.object({
  id: z.number(),
  page: z.string(),
  userAgent: z.string().optional(),
  referrer: z.string().optional(),
  sessionId: z.string(),
  timestamp: z.date(),
  duration: z.number().optional(), // time spent on page in seconds
  location: z.object({
    country: z.string().optional(),
    region: z.string().optional(),
    city: z.string().optional(),
  }).optional()
});

export const insertPageViewSchema = pageViewSchema.omit({ id: true, timestamp: true });

export const trafficStatsSchema = z.object({
  activeUsers: z.number(),
  totalPageViews: z.number(),
  uniqueVisitors: z.number(),
  avgSessionDuration: z.number(),
  topPages: z.array(z.object({
    page: z.string(),
    views: z.number()
  })),
  hourlyData: z.array(z.object({
    hour: z.string(),
    visitors: z.number(),
    pageViews: z.number()
  })),
  locationData: z.array(z.object({
    country: z.string(),
    visitors: z.number()
  }))
});

export type PageView = z.infer<typeof pageViewSchema>;
export type InsertPageView = z.infer<typeof insertPageViewSchema>;
export type TrafficStats = z.infer<typeof trafficStatsSchema>;
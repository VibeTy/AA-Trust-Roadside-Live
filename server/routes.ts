import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema, 
  insertQuoteSubmissionSchema, 
  insertBookingSubmissionSchema,
  registerUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  insertPageViewSchema
} from "@shared/schema";
import { z } from "zod";
import session from "express-session";

// Traffic tracking
let activeUsers = 0;
let adminClients = new Set();

// Simple admin authentication middleware
const isAdminAuthenticated = (req: any, res: any, next: any) => {
  if (req.session?.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'admin-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // User Registration
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = registerUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists"
        });
      }

      // Check if email already exists
      if (validatedData.email) {
        const existingEmail = await storage.getUserByEmail(validatedData.email);
        if (existingEmail) {
          return res.status(400).json({
            success: false,
            message: "Email already registered"
          });
        }
      }

      const user = await storage.createUser(validatedData);
      
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  // User Login
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      const isValidPassword = await storage.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      req.session.userId = user.id;
      req.session.username = user.username;

      res.json({
        success: true,
        message: "Login successful",
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Forgot Password
  app.post("/api/forgot-password", async (req, res) => {
    try {
      const validatedData = forgotPasswordSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        // Don't reveal if email exists or not for security
        return res.json({
          success: true,
          message: "If the email exists, a reset link has been sent"
        });
      }

      const { token } = await storage.createPasswordResetToken(validatedData.email);
      
      // In a real app, you'd send an email here with the reset link
      console.log(`Password reset token for ${validatedData.email}: ${token}`);
      
      res.json({
        success: true,
        message: "If the email exists, a reset link has been sent",
        // In development, return the token for testing
        ...(process.env.NODE_ENV === 'development' && { resetToken: token })
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error in forgot password:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  // Reset Password
  app.post("/api/reset-password", async (req, res) => {
    try {
      const validatedData = resetPasswordSchema.parse(req.body);
      
      const user = await storage.resetPassword(validatedData.token, validatedData.password);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset token"
        });
      }

      res.json({
        success: true,
        message: "Password reset successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error resetting password:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  // User Logout
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Could not log out"
        });
      }
      res.json({
        success: true,
        message: "Logged out successfully"
      });
    });
  });
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store the contact submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // In a real application, you might also send an email notification here
      console.log("New contact submission:", submission);
      
      res.status(201).json({ 
        success: true, 
        message: "Contact submission received successfully",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error creating contact submission:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Quote form submission endpoint
  app.post("/api/quotes", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertQuoteSubmissionSchema.parse(req.body);
      
      // Store the quote submission
      const submission = await storage.createQuoteSubmission(validatedData);
      
      // Log for demo purposes
      console.log("New quote submission:", submission);
      
      res.status(201).json({ 
        success: true, 
        message: "Quote request received successfully",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error creating quote submission:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  // Get all quote submissions (for admin purposes)
  app.get("/api/quotes", async (req, res) => {
    try {
      const submissions = await storage.getQuoteSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching quote submissions:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Update quote contacted status
  app.patch("/api/quotes/:id/contacted", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { contacted = true } = req.body;
      
      const updatedQuote = await storage.updateQuoteContacted(id, contacted);
      
      if (!updatedQuote) {
        return res.status(404).json({
          success: false,
          message: "Quote not found"
        });
      }
      
      res.json({
        success: true,
        message: "Quote updated successfully",
        quote: updatedQuote
      });
    } catch (error) {
      console.error("Error updating quote:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Booking endpoints
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSubmissionSchema.parse(req.body);
      const booking = await storage.createBookingSubmission(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ message: "Invalid booking data" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookingSubmissions();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.patch("/api/bookings/:id/contacted", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { contacted } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid booking ID" });
      }
      
      const updatedBooking = await storage.updateBookingContacted(id, contacted);
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(updatedBooking);
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ message: "Failed to update booking" });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Simple admin check - in production, use proper password hashing
      if (username === "admin" && password === "admin123") {
        req.session.isAdmin = true;
        res.json({
          success: true,
          message: "Admin login successful"
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid admin credentials"
        });
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  app.post("/api/admin/logout", isAdminAuthenticated, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Could not log out"
        });
      }
      res.json({
        success: true,
        message: "Admin logged out successfully"
      });
    });
  });

  // AI Smart Reply endpoint
  app.post("/api/ai/smart-reply", async (req, res) => {
    try {
      const { name, location, serviceType, description, urgency, vehicleInfo } = req.body;
      
      // Mock AI response - in production, integrate with Together AI, OpenAI, or similar
      const aiResponse = {
        reply: `Hi ${name}! This is Fritzner from AA Trust Roadside. I got your request for ${serviceType} in ${location}. I can be there in about 15-20 minutes. My number is (386) 333-4458. Thanks for choosing us!`,
        price: serviceType.toLowerCase().includes('tire') ? '$150-180' : '$75-95',
        urgencyScore: urgency === 'emergency' ? 95 : urgency === 'urgent' ? 75 : 45,
        reasoning: urgency === 'emergency' 
          ? 'High priority - emergency situation requires immediate response'
          : 'Standard response time acceptable based on service type'
      };
      
      res.json(aiResponse);
    } catch (error) {
      console.error("Error generating AI reply:", error);
      res.status(500).json({ message: "Failed to generate smart reply" });
    }
  });

  // Send reply via SMS/Email
  app.post("/api/send-reply", async (req, res) => {
    try {
      const { method, to, message, customerName } = req.body;
      
      if (method === 'sms') {
        // In production, integrate with Twilio
        console.log(`SMS to ${to}: ${message}`);
        
        // Mock success response
        res.json({ 
          success: true, 
          message: `SMS sent to ${customerName}`,
          messageId: `msg_${Date.now()}`
        });
      } else if (method === 'email') {
        // In production, integrate with MailerSend or similar
        console.log(`Email to ${to}: ${message}`);
        
        res.json({ 
          success: true, 
          message: `Email sent to ${customerName}`,
          messageId: `email_${Date.now()}`
        });
      } else {
        res.status(400).json({ message: "Invalid send method" });
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      res.status(500).json({ message: "Failed to send reply" });
    }
  });

  // Enhanced Traffic tracking endpoints
  app.get("/api/admin/traffic", isAdminAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getTrafficStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching traffic stats:", error);
      res.status(500).json({ message: "Failed to fetch traffic stats" });
    }
  });

  app.post("/api/track-pageview", async (req, res) => {
    try {
      const { sessionId, page, userAgent, referrer } = req.body;
      
      if (!sessionId || !page) {
        return res.status(400).json({ message: "Session ID and page are required" });
      }

      await storage.trackPageView(sessionId, page, userAgent, referrer);
      
      // Update active users count
      activeUsers = (await storage.getTrafficStats()).activeUsers;
      
      // Broadcast to all admin clients
      adminClients.forEach((client: any) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ 
            type: 'traffic_update', 
            activeUsers,
            page,
            timestamp: new Date().toISOString()
          }));
        }
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking page view:", error);
      res.status(500).json({ message: "Failed to track page view" });
    }
  });

  app.post("/api/track-user", (req, res) => {
    activeUsers++;
    // Broadcast to all admin clients
    adminClients.forEach((client: any) => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(JSON.stringify({ type: 'user_count', count: activeUsers }));
      }
    });
    res.json({ success: true });
  });

  app.post("/api/untrack-user", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (sessionId) {
        await storage.endSession(sessionId);
      }
      
      activeUsers = Math.max(0, activeUsers - 1);
      
      // Broadcast to all admin clients
      adminClients.forEach((client: any) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ type: 'user_count', count: activeUsers }));
        }
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error untracking user:", error);
      res.status(500).json({ message: "Failed to untrack user" });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket server for real-time admin updates
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: '/ws/admin'
  });

  wss.on('connection', (ws) => {
    console.log('Admin WebSocket connected');
    adminClients.add(ws);
    
    // Send current user count immediately
    ws.send(JSON.stringify({ type: 'user_count', count: activeUsers }));
    
    ws.on('close', () => {
      console.log('Admin WebSocket disconnected');
      adminClients.delete(ws);
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      adminClients.delete(ws);
    });
  });

  return httpServer;
}

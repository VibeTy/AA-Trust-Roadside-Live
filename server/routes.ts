import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertQuoteSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import session from "express-session";

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

  const httpServer = createServer(app);
  return httpServer;
}

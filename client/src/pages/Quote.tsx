import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  cityOrZip: z.string().optional(),
  serviceNeeded: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please describe your service needs")
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

export default function Quote() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      cityOrZip: "",
      serviceNeeded: "",
      message: ""
    }
  });

  const quoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      // Log form data for demo purposes
      console.log("Quote form submission:", data);
      return await apiRequest("POST", "/api/quotes", data);
    },
    onSuccess: () => {
      // Redirect to thank you page
      setLocation("/thank-you");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again or call us directly.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: QuoteFormData) => {
    quoteMutation.mutate(data);
  };

  const serviceOptions = [
    "Engine Diagnostics",
    "Electrical Repair",
    "Heavy Equipment Service", 
    "Hydraulic Systems",
    "Emergency Roadside",
    "Mobile Repair",
    "Oil Change & Maintenance",
    "DOT Inspection",
    "Fleet Service",
    "Welding & Fabrication",
    "Other (specify in message)"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-wrench text-[hsl(221,83%,53%)] text-2xl mr-3"></i>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Florida Diesel Pro</span>
            </div>
            <button 
              onClick={() => setLocation("/")}
              className="text-gray-600 dark:text-gray-400 hover:text-[hsl(221,83%,53%)] transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get Your Free Quote</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Tell us about your diesel repair needs and we'll get back to you with a competitive quote within 15 minutes.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Full Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        className="h-12 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Phone Number *</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="(555) 123-4567" 
                        className="h-12 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cityOrZip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">City or ZIP Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Palm Coast, FL or 32164" 
                        className="h-12 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="serviceNeeded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Service Needed *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                          <SelectValue placeholder="Select the service you need" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        {serviceOptions.map((service) => (
                          <SelectItem key={service} value={service} className="dark:text-white dark:hover:bg-gray-600">
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Describe Your Issue *</FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={5}
                        placeholder="Please describe your diesel repair needs, vehicle type, current location, and any symptoms you're experiencing..." 
                        className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-[hsl(221,83%,53%)] hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg h-14 text-lg"
                disabled={quoteMutation.isPending}
              >
                <i className="fas fa-paper-plane mr-2"></i>
                {quoteMutation.isPending ? "Submitting..." : "Get My Free Quote"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center mb-3">
              <i className="fas fa-clock text-[hsl(43,96%,56%)] mr-3"></i>
              <span className="font-semibold text-gray-900 dark:text-white">Quick Response Time</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              We typically respond to quote requests within 15 minutes during business hours. For immediate assistance, call us at{" "}
              <a href="tel:+15551234567" className="text-[hsl(0,84%,60%)] hover:text-red-700 font-medium">
                (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
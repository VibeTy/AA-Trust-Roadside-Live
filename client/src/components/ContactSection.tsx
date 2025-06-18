import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you! Your service request has been submitted. We will contact you within 15 minutes during business hours.",
        duration: 5000
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: "fas fa-phone",
      bgColor: "bg-red-600",
      title: "Call Us Now",
      subtitle: "(386) 372-8412",
      href: "tel:+13863728412",
      contact: "24/7 Emergency Line"
    },
    {
      icon: "fas fa-phone",
      bgColor: "bg-gray-600",
      title: "Backup Line",
      subtitle: "(386) 338-7945",
      href: "tel:+13863387945",
      contact: "Secondary Number"
    },
    {
      icon: "fas fa-clock",
      bgColor: "bg-[hsl(43,96%,56%)]",
      title: "Business Hours",
      subtitle: "Mon-Fri: 7:00 AM - 7:00 PM",
      contact: "24/7 Emergency Service",
      textColor: "text-[hsl(0,84%,60%)]"
    },
    {
      icon: "fas fa-map-marker-alt",
      bgColor: "bg-green-600", 
      title: "Service Area",
      subtitle: "Based in Palm Coast, FL",
      contact: "Serving 50-mile radius"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Ready to get your vehicle back on the road? Contact us today for fast, reliable automotive service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className={`${info.bgColor} text-white p-3 rounded-lg mr-4 ${info.bgColor === "bg-[hsl(43,96%,56%)]" ? "text-gray-900" : ""}`}>
                    <i className={`${info.icon} text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{info.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{info.subtitle}</p>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        className="text-[hsl(221,83%,53%)] hover:text-blue-700 font-medium transition-colors"
                      >
                        {info.contact}
                      </a>
                    ) : (
                      <p className={`font-medium ${info.textColor || "text-gray-700 dark:text-gray-300"}`}>
                        {info.contact}
                      </p>
                    )}
                    {info.title === "Business Hours" && (
                      <p className="text-gray-700 dark:text-gray-300">Weekends: Emergency Only</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quote Request Form</h3>
            
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
                          className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
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
                          placeholder="Enter your phone number" 
                          className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
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
                          placeholder="Enter your phone number" 
                          className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Car Issue or Symptoms *</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder="Describe what's wrong with your vehicle or what help you need" 
                          className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
                  disabled={contactMutation.isPending}
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  {contactMutation.isPending ? "Sending..." : "Submit Quote Request"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Need immediate assistance? 
                <a href="tel:+13863728412" className="text-red-600 hover:text-red-700 font-medium ml-1">
                  Call (386) 372-8412
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

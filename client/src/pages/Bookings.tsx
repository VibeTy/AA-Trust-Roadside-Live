import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Phone, MapPin, Truck, Wrench } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  vehicleType: z.string().min(1, "Please select vehicle type"),
  location: z.string().min(5, "Please provide your location"),
  serviceNeeded: z.string().min(1, "Please select service needed"),
  urgency: z.string().min(1, "Please select urgency level"),
  description: z.string().min(10, "Please describe your issue in detail"),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional()
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function Bookings() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      vehicleType: "",
      location: "",
      serviceNeeded: "",
      urgency: "",
      description: "",
      preferredDate: "",
      preferredTime: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      await apiRequest("/api/bookings", {
        method: "POST",
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Booking Request Submitted",
        description: "We'll contact you within 15 minutes to confirm your service.",
        variant: "default"
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us directly at (386) 372-8412",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: BookingFormData) => {
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-20 pb-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Booking Request Received!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Thank you for choosing AA Trust Roadside. We'll contact you within 15 minutes to confirm your service appointment.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
                <p className="text-blue-800 dark:text-blue-200 font-semibold">
                  Emergency? Call us now for immediate assistance:
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center mt-2">
                  <a href="tel:+13863728412" className="text-blue-600 dark:text-blue-400 font-bold">
                    (386) 372-8412
                  </a>
                  <span className="hidden sm:inline text-gray-400">or</span>
                  <a href="tel:+13863387945" className="text-blue-600 dark:text-blue-400 font-bold">
                    (386) 338-7945
                  </a>
                </div>
              </div>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
        <Footer />
        <StickyCallButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Schedule Heavy Duty Diesel Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional mobile diesel repair serving Palm Coast, Jacksonville, Daytona Beach, and St. Augustine. 24/7 emergency service available.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Highlights */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Wrench className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Engine Diagnostics & Repair</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Truck className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Transmission Service</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Mobile Roadside Repair</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                    <span>24/7 Emergency Service</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-3">
                  Need Immediate Help?
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  Don't wait for a callback - call us now for emergency roadside assistance.
                </p>
                <div className="space-y-2">
                  <a 
                    href="tel:+13863728412"
                    className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
                  >
                    Call (386) 372-8412
                  </a>
                  <a 
                    href="tel:+13863387945"
                    className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
                  >
                    Backup (386) 338-7945
                  </a>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Service Booking Form
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
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
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="(386) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="semi-truck">Semi Truck/Tractor Trailer</SelectItem>
                              <SelectItem value="box-truck">Box Truck/Delivery Truck</SelectItem>
                              <SelectItem value="pickup-truck">Pickup Truck (Diesel)</SelectItem>
                              <SelectItem value="bus">Bus/RV</SelectItem>
                              <SelectItem value="construction">Construction Equipment</SelectItem>
                              <SelectItem value="other">Other Heavy Duty Vehicle</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Current Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address, city, or nearest mile marker" {...field} />
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
                          <FormLabel>Service Needed *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="engine-repair">Engine Repair</SelectItem>
                              <SelectItem value="transmission">Transmission Service</SelectItem>
                              <SelectItem value="electrical">Electrical Issues</SelectItem>
                              <SelectItem value="brake-system">Brake System</SelectItem>
                              <SelectItem value="cooling-system">Cooling System</SelectItem>
                              <SelectItem value="fuel-system">Fuel System</SelectItem>
                              <SelectItem value="diagnostics">Diagnostics</SelectItem>
                              <SelectItem value="roadside-emergency">Roadside Emergency</SelectItem>
                              <SelectItem value="preventive-maintenance">Preventive Maintenance</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Urgency Level *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="How urgent is this?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="emergency">Emergency - Stranded Now</SelectItem>
                              <SelectItem value="urgent">Urgent - Within 4 Hours</SelectItem>
                              <SelectItem value="same-day">Same Day Service</SelectItem>
                              <SelectItem value="next-day">Next Business Day</SelectItem>
                              <SelectItem value="flexible">Flexible Scheduling</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="early-morning">Early Morning (6AM - 9AM)</SelectItem>
                              <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                              <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                              <SelectItem value="anytime">Anytime</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Problem Description *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe the issue in detail - symptoms, when it started, any warning lights, etc."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-8">
                    <Button 
                      type="submit" 
                      disabled={mutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg"
                    >
                      {mutation.isPending ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                      * We'll contact you within 15 minutes to confirm your service appointment
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <StickyCallButton />
    </div>
  );
}
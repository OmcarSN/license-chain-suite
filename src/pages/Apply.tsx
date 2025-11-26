import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Upload } from "lucide-react";

const applicationSchema = z.object({
  license_type: z.string().min(1, "Please select a license type"),
  business_name: z.string().min(2, "Business name must be at least 2 characters").max(200, "Business name is too long"),
  registration_number: z.string().min(3, "Registration number is required").max(50, "Registration number is too long"),
  business_address: z.string().min(10, "Please provide a complete address").max(500, "Address is too long"),
  contact_person: z.string().min(2, "Contact person name is required").max(100, "Name is too long"),
  contact_email: z.string().email("Please provide a valid email address").max(255, "Email is too long"),
  phone_number: z.string().min(10, "Please provide a valid phone number").max(20, "Phone number is too long"),
  business_type: z.string().min(1, "Please select a business type"),
  business_description: z.string().min(20, "Please provide a detailed description (at least 20 characters)").max(1000, "Description is too long")
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const Apply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      license_type: "",
      business_name: "",
      registration_number: "",
      business_address: "",
      contact_person: "",
      contact_email: "",
      phone_number: "",
      business_type: "",
      business_description: ""
    }
  });

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to submit an application.",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const onSubmit = async (data: ApplicationFormData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit an application.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('license_applications')
        .insert({
          user_id: user.id,
          license_type: data.license_type,
          business_name: data.business_name,
          registration_number: data.registration_number,
          business_address: data.business_address,
          contact_person: data.contact_person,
          contact_email: data.contact_email,
          phone_number: data.phone_number,
          business_type: data.business_type,
          business_description: data.business_description,
          status: 'pending'
        });

      if (error) {
        console.error('Application submission error:', error);
        toast({
          title: "Submission Failed",
          description: error.message || "Failed to submit application. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Application Submitted",
        description: "Your license application has been submitted successfully!",
      });
      navigate("/dashboard");
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Apply for Business License</CardTitle>
              <CardDescription>
                Fill out the form below to submit your license application. All fields are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="license_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select license type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Business License">Business License</SelectItem>
                            <SelectItem value="Trade License">Trade License</SelectItem>
                            <SelectItem value="Professional License">Professional License</SelectItem>
                            <SelectItem value="Food & Beverage License">Food & Beverage License</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="business_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Business Ltd." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registration_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration Number</FormLabel>
                          <FormControl>
                            <Input placeholder="REG123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="business_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your complete business address"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contact_person"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="contact@business.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+1 234 567 8900" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="business_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Retail">Retail</SelectItem>
                              <SelectItem value="Wholesale">Wholesale</SelectItem>
                              <SelectItem value="Service">Service</SelectItem>
                              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="business_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe your business activities"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 p-6 border-2 border-dashed rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Upload className="h-5 w-5 text-primary" />
                      <Label>Upload Required Documents</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Note: File upload functionality will be available soon. For now, you can submit the application and upload documents later.
                    </p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="kyc-document" className="text-sm">KYC Document</Label>
                      <Input id="kyc-document" type="file" accept=".pdf,.jpg,.png" disabled />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="business-certificate" className="text-sm">Business Certificate</Label>
                      <Input id="business-certificate" type="file" accept=".pdf,.jpg,.png" disabled />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tax-document" className="text-sm">Tax Registration</Label>
                      <Input id="tax-document" type="file" accept=".pdf,.jpg,.png" disabled />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="additional-docs" className="text-sm">Additional Documents (Optional)</Label>
                      <Input id="additional-docs" type="file" accept=".pdf,.jpg,.png" multiple disabled />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading ? "Submitting..." : "Submit Application"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Apply;

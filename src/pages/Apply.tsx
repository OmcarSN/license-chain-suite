import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Upload } from "lucide-react";

const Apply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Application Submitted",
        description: "Your license application has been submitted successfully!",
      });
      navigate("/dashboard");
    }, 1500);
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="license-type">License Type</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select license type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business License</SelectItem>
                      <SelectItem value="trade">Trade License</SelectItem>
                      <SelectItem value="professional">Professional License</SelectItem>
                      <SelectItem value="food">Food & Beverage License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" placeholder="Your Business Ltd." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration-number">Registration Number</Label>
                    <Input id="registration-number" placeholder="REG123456" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-address">Business Address</Label>
                  <Textarea 
                    id="business-address" 
                    placeholder="Enter your complete business address"
                    rows={3}
                    required 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-person">Contact Person</Label>
                    <Input id="contact-person" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" placeholder="contact@business.com" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 234 567 8900" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="wholesale">Wholesale</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea 
                    id="business-description" 
                    placeholder="Briefly describe your business activities"
                    rows={4}
                    required 
                  />
                </div>

                <div className="space-y-4 p-6 border-2 border-dashed rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <Label>Upload Required Documents</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="kyc-document" className="text-sm">KYC Document</Label>
                    <Input id="kyc-document" type="file" accept=".pdf,.jpg,.png" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="business-certificate" className="text-sm">Business Certificate</Label>
                    <Input id="business-certificate" type="file" accept=".pdf,.jpg,.png" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-document" className="text-sm">Tax Registration</Label>
                    <Input id="tax-document" type="file" accept=".pdf,.jpg,.png" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional-docs" className="text-sm">Additional Documents (Optional)</Label>
                    <Input id="additional-docs" type="file" accept=".pdf,.jpg,.png" multiple />
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
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Apply;

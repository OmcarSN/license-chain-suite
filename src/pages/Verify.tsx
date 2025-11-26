import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Verify = () => {
  const [licenseId, setLicenseId] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setVerificationResult(null);
    
    try {
      // Query only safe public fields - NOT exposing id, user_id, application_id
      const { data, error } = await supabase
        .from('licenses')
        .select('license_number, license_type, status, business_name, issue_date, expiry_date, blockchain_hash')
        .eq('license_number', licenseId)
        .maybeSingle();

      if (error) {
        console.error('Verification error:', error);
        toast({
          title: "Error",
          description: "Failed to verify license. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      if (!data) {
        setVerificationResult({
          isValid: false,
          licenseNumber: licenseId
        });
      } else {
        // Check if license is expired
        const expiryDate = new Date(data.expiry_date);
        const isExpired = expiryDate < new Date();
        
        setVerificationResult({
          isValid: !isExpired && data.status === 'active',
          licenseNumber: data.license_number,
          businessName: data.business_name,
          licenseType: data.license_type,
          issueDate: new Date(data.issue_date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          expiryDate: new Date(data.expiry_date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          status: isExpired ? 'Expired' : data.status,
          blockchainHash: data.blockchain_hash || 'N/A'
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Verify License</h1>
            <p className="text-muted-foreground">
              Enter a license number to verify its authenticity on the blockchain
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>License Verification</CardTitle>
              <CardDescription>
                Verify the authenticity and validity of any issued license
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="license-id">License Number</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="license-id" 
                      placeholder="Enter license number (e.g., LIC-2024-12345)"
                      value={licenseId}
                      onChange={(e) => setLicenseId(e.target.value)}
                      required 
                    />
                    <Button type="submit" disabled={loading}>
                      <Search className="mr-2 h-4 w-4" />
                      {loading ? "Verifying..." : "Verify"}
                    </Button>
                  </div>
                </div>
              </form>

              {verificationResult && (
                <div className="mt-6 p-6 border rounded-lg space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    {verificationResult.isValid ? (
                      <>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-green-600">License Verified</h3>
                          <p className="text-sm text-muted-foreground">
                            This license is valid and authentic
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                          <XCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-red-600">Invalid License</h3>
                          <p className="text-sm text-muted-foreground">
                            This license could not be verified
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {verificationResult.isValid && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">License Number</p>
                          <p className="font-medium">{verificationResult.licenseNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {verificationResult.status}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Business Name</p>
                        <p className="font-medium">{verificationResult.businessName}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">License Type</p>
                        <p className="font-medium">{verificationResult.licenseType}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Issue Date</p>
                          <p className="font-medium">{verificationResult.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Expiry Date</p>
                          <p className="font-medium">{verificationResult.expiryDate}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t">
                        <p className="text-sm text-muted-foreground mb-1">Blockchain Hash</p>
                        <p className="font-mono text-xs break-all bg-muted p-2 rounded">
                          {verificationResult.blockchainHash}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Verify;

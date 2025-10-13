import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { 
  FileText, 
  Upload, 
  Eye, 
  RefreshCw, 
  Download, 
  Clock, 
  Building2, 
  History, 
  Bell 
} from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Dashboard</h1>
          <p className="text-muted-foreground">Manage your licenses and applications</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/apply">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Apply for New License</CardTitle>
                <CardDescription>Submit a new business license application</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                <Upload className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>Upload KYC and required certificates</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                <Eye className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>View Application Status</CardTitle>
              <CardDescription>Track your application progress</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
                <RefreshCw className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle>Renew License</CardTitle>
              <CardDescription>Renew your existing licenses</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2">
                <Download className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle>Download NFT License</CardTitle>
              <CardDescription>Download your blockchain certificate</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle>Check License Validity</CardTitle>
              <CardDescription>View expiry dates and validity status</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-2">
                <Building2 className="h-6 w-6 text-cyan-500" />
              </div>
              <CardTitle>Update Business Info</CardTitle>
              <CardDescription>Modify your business details</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-2">
                <History className="h-6 w-6 text-pink-500" />
              </div>
              <CardTitle>License History</CardTitle>
              <CardDescription>View transaction history</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-2">
                <Bell className="h-6 w-6 text-yellow-500" />
              </div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>View alerts and updates</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Applications</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="font-medium">Business License #12345</p>
                    <p className="text-sm text-muted-foreground">Submitted on Jan 15, 2025</p>
                  </div>
                  <Badge>Pending</Badge>
                </div>
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="font-medium">Trade License #12344</p>
                    <p className="text-sm text-muted-foreground">Submitted on Jan 10, 2025</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Renewal Request #12343</p>
                    <p className="text-sm text-muted-foreground">Submitted on Jan 5, 2025</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Review</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

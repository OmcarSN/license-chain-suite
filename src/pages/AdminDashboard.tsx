import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { 
  FileCheck, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  ShieldCheck, 
  Bell, 
  Settings, 
  BarChart3 
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage licenses and applications</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Renewal Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Licenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">342</div>
              <p className="text-xs text-muted-foreground">Total issued</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Pending Applications</CardTitle>
              <CardDescription>Review new license applications</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle>Approve License</CardTitle>
              <CardDescription>Approve pending applications</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-2">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle>Reject / Revoke</CardTitle>
              <CardDescription>Reject or revoke licenses</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                <RefreshCw className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>Renewal Requests</CardTitle>
              <CardDescription>Process license renewals</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2">
                <ShieldCheck className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle>Verify License</CardTitle>
              <CardDescription>Verify license authenticity</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-2">
                <Bell className="h-6 w-6 text-yellow-500" />
              </div>
              <CardTitle>Send Notifications</CardTitle>
              <CardDescription>Notify users about updates</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-2">
                <Settings className="h-6 w-6 text-cyan-500" />
              </div>
              <CardTitle>Manage Account</CardTitle>
              <CardDescription>Admin account settings</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-2">
                <BarChart3 className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View system statistics</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest license applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="font-medium">ABC Trading Ltd.</p>
                    <p className="text-sm text-muted-foreground">Business License</p>
                  </div>
                  <Badge>Pending</Badge>
                </div>
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="font-medium">XYZ Corp</p>
                    <p className="text-sm text-muted-foreground">Trade License</p>
                  </div>
                  <Badge>Pending</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tech Solutions Inc.</p>
                    <p className="text-sm text-muted-foreground">Professional License</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Review</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <FileCheck className="mr-2 h-4 w-4" />
                Review Pending Applications
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CheckCircle className="mr-2 h-4 w-4" />
                Bulk Approve Licenses
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Send System Notification
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

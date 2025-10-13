import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { ShieldCheck, Zap, Lock, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-tight pb-2">
              Blockchain-Powered
              <br />
              Digital Licensing System
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              Apply for business licenses directly, securely, and transparently using blockchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              <Link to="/apply">
                <Button size="lg" variant="hero" className="text-lg px-8">
                  Apply for License
                </Button>
              </Link>
              <Link to="/verify">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Verify License
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose LicenseChain?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:border-primary transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Blockchain Secured</CardTitle>
                  <CardDescription>
                    All licenses are secured on the blockchain, ensuring tamper-proof records
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Fast Processing</CardTitle>
                  <CardDescription>
                    Get your license applications processed quickly with automated workflows
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-purple-500 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2">
                    <Lock className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle>Secure & Private</CardTitle>
                  <CardDescription>
                    Your data is encrypted and protected with enterprise-grade security
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-500 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
                    <Globe className="h-6 w-6 text-green-500" />
                  </div>
                  <CardTitle>Globally Accessible</CardTitle>
                  <CardDescription>
                    Access and verify licenses from anywhere in the world, anytime
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Card className="max-w-2xl mx-auto border-2 border-primary/20 shadow-xl">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of businesses using blockchain for license management
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Create Account
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 LicenseChain. Powered by Blockchain Technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

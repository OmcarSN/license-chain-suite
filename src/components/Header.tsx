import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="LicenseChain Logo" 
              className="h-10 w-10 transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LicenseChain
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button 
                variant="ghost" 
                className={isActive("/") ? "bg-accent/10 text-accent" : ""}
              >
                Home
              </Button>
            </Link>
            <Link to="/apply">
              <Button 
                variant="ghost"
                className={isActive("/apply") ? "bg-accent/10 text-accent" : ""}
              >
                Apply
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant="ghost"
                className={isActive("/dashboard") ? "bg-accent/10 text-accent" : ""}
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/admin">
              <Button 
                variant="ghost"
                className={isActive("/admin") ? "bg-accent/10 text-accent" : ""}
              >
                Admin
              </Button>
            </Link>
            <Link to="/verify">
              <Button 
                variant="ghost"
                className={isActive("/verify") ? "bg-accent/10 text-accent" : ""}
              >
                Verify
              </Button>
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

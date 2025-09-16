import { Button } from "@/components/ui/button";
import { Brain, BarChart3, Wallet, MessageSquare } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Copilot</span>
            <span className="text-sm text-muted-foreground">Analytics</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-muted-foreground hover:text-foreground transition-smooth">
              Dashboard
            </a>
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-smooth">
              Portfolio
            </a>
            <a href="#analytics" className="text-muted-foreground hover:text-foreground transition-smooth">
              Analytics
            </a>
            <a href="#ai-assistant" className="text-muted-foreground hover:text-foreground transition-smooth">
              AI Assistant
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
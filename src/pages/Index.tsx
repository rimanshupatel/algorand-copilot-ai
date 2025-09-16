import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import heroImage from "@/assets/hero-crypto.jpg";
import { Brain, BarChart3, Shield, Zap, MessageSquare, TrendingUp } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms analyze market trends and provide personalized insights for your Algorand investments."
    },
    {
      icon: BarChart3,
      title: "Real-Time Portfolio Tracking",
      description: "Monitor your ALGO holdings, NFTs, and DeFi positions with live price updates and performance metrics."
    },
    {
      icon: MessageSquare,
      title: "Conversational Assistant",
      description: "Chat with our AI to get instant answers about your portfolio, market conditions, and investment strategies."
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security with encrypted data transmission and secure wallet integrations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center bg-secondary/50 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm text-foreground">Next-Generation Crypto Analytics</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your AI-Powered
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Algorand </span>
                Analytics Copilot
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Transform your crypto investing with personalized portfolio intelligence, market insights, and an AI assistant that understands the Algorand ecosystem.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Chatting with AI
                </Button>
                <Button variant="outline" size="lg">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Demo Dashboard
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Copilot Crypto Analytics Dashboard" 
                  className="rounded-2xl shadow-elevated animate-float"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-ai rounded-full animate-glow blur-xl opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Built for the Future of Crypto
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Copilot combines cutting-edge AI with deep Algorand expertise to deliver insights that matter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 bg-card border-border shadow-elevated hover:shadow-glow-primary transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Chat Demo */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Chat with Your AI Copilot
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the power of conversational crypto analytics
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Portfolio Dashboard Preview */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Advanced Portfolio Analytics
            </h2>
            <p className="text-xl text-muted-foreground">
              Real-time insights into your Algorand investments
            </p>
          </div>
          
          <PortfolioDashboard />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Crypto Experience?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust Copilot for their Algorand analytics and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Copilot Analytics</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 Copilot Analytics. Empowering the future of Algorand investing.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
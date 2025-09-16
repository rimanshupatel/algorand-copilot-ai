import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Sparkles, Shield, TrendingUp, Wallet, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-crypto.jpg";
import WalletConnection from "@/components/WalletConnection";
import ChatInterface from "@/components/ChatInterface";
import Web3Portfolio from "@/components/Web3Portfolio";
import NFTTransactionPanel from "@/components/NFTTransactionPanel";
import { useWeb3 } from "@/contexts/Web3Context";

const Index = () => {
  const { isConnected } = useWeb3();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Powered by AI
                </Badge>
                <h1 className="text-5xl font-bold text-white leading-tight">
                  Your AI-Powered
                  <span className="block text-accent">Algorand Copilot</span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Experience the future of crypto analytics with personalized portfolio insights, 
                  NFT trend analysis, and smart contract interactions on Algorand.
                </p>
              </div>
              
              {!isConnected ? (
                <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Connect Pera Wallet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Badge variant="default" className="bg-gradient-success text-white px-4 py-2">
                  <Wallet className="w-4 h-4 mr-2" />
                  Wallet Connected
                </Badge>
              )}
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Algorand Copilot AI Platform" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-ai p-4 rounded-xl shadow-lg">
                <Bot className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Revolutionary Crypto Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Harness the power of AI to navigate the Algorand ecosystem with confidence and precision.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-card border-border shadow-elevated hover:shadow-glow-primary transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-ai rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI-Powered Analytics</h3>
              <p className="text-muted-foreground">
                Advanced machine learning algorithms analyze market trends and provide personalized investment insights.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card border-border shadow-elevated hover:shadow-glow-primary transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Secure & Decentralized</h3>
              <p className="text-muted-foreground">
                Built on Algorand's secure blockchain with non-custodial wallet integration for maximum security.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card border-border shadow-elevated hover:shadow-glow-primary transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Insights</h3>
              <p className="text-muted-foreground">
                Get instant notifications about portfolio changes, NFT opportunities, and market movements.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your Personal Crypto Command Center
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor your portfolio, chat with AI, and execute transactions all in one place.
            </p>
          </div>
          
          <Tabs defaultValue="wallet" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="ai-chat">AI Assistant</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wallet" className="space-y-6">
              <WalletConnection />
            </TabsContent>
            
            <TabsContent value="portfolio" className="space-y-6">
              <Web3Portfolio />
            </TabsContent>
            
            <TabsContent value="transactions" className="space-y-6">
              <NFTTransactionPanel />
            </TabsContent>
            
            <TabsContent value="ai-chat" className="space-y-6">
              <ChatInterface />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;
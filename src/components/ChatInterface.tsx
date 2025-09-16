import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, TrendingUp, AlertCircle } from "lucide-react";

const ChatInterface = () => {
  const mockMessages = [
    {
      type: 'bot',
      message: "Hello! I'm your Copilot AI assistant. I can help you analyze your Algorand portfolio, track NFT trends, and provide market insights. What would you like to know?",
      timestamp: "2:34 PM"
    },
    {
      type: 'user', 
      message: "Show me my portfolio performance for this week",
      timestamp: "2:35 PM"
    },
    {
      type: 'bot',
      message: "Your portfolio is up 12.5% this week! Your ALGO holdings gained 8.2% and your NFT collection increased by 24%. Would you like me to break down the performance by asset class?",
      timestamp: "2:35 PM"
    }
  ];

  return (
    <Card className="bg-card border-border shadow-elevated">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-ai rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Copilot Assistant</h3>
            <p className="text-sm text-muted-foreground">Powered by advanced analytics</p>
          </div>
        </div>

        <div className="space-y-4 mb-6 h-80 overflow-y-auto">
          {mockMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-sm p-3 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-gradient-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                <div className="flex items-start space-x-2">
                  {msg.type === 'bot' && <Bot className="w-4 h-4 mt-0.5 text-accent" />}
                  {msg.type === 'user' && <User className="w-4 h-4 mt-0.5" />}
                  <div>
                    <p className="text-sm">{msg.message}</p>
                    <span className="text-xs opacity-70 mt-1 block">{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Input 
            placeholder="Ask me about your portfolio, market trends, or NFT insights..."
            className="flex-1"
          />
          <Button variant="ai" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <TrendingUp className="w-3 h-3 mr-1" />
            Market Analysis
          </Button>
          <Button variant="outline" size="sm">
            <AlertCircle className="w-3 h-3 mr-1" />
            Risk Assessment
          </Button>
          <Button variant="outline" size="sm">
            Portfolio Summary
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
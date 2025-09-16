import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, LogOut, Copy, ExternalLink } from "lucide-react";
import { useWeb3 } from "@/contexts/Web3Context";
import { toast } from "@/hooks/use-toast";

const WalletConnection = () => {
  const { accountAddress, isConnected, isConnecting, connectWallet, disconnectWallet } = useWeb3();

  const copyAddress = () => {
    if (accountAddress) {
      navigator.clipboard.writeText(accountAddress);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const viewOnExplorer = () => {
    if (accountAddress) {
      window.open(`https://testnet.algoexplorer.io/address/${accountAddress}`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <Card className="p-6 bg-card border-border shadow-elevated">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
            <Wallet className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground mb-4">
              Connect your Pera Wallet to access your Algorand portfolio and start trading NFTs
            </p>
          </div>
          <Button 
            onClick={connectWallet} 
            disabled={isConnecting}
            variant="hero"
            size="lg"
            className="w-full"
          >
            {isConnecting ? "Connecting..." : "Connect Pera Wallet"}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border shadow-elevated">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-success rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-success-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Wallet Connected</h3>
              <Badge variant="default" className="bg-gradient-success">
                Pera Wallet
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={disconnectWallet}>
            <LogOut className="w-4 h-4 mr-1" />
            Disconnect
          </Button>
        </div>

        <div className="bg-secondary rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address</span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                <Copy className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={viewOnExplorer}>
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <p className="text-sm font-mono text-foreground break-all">
            {accountAddress}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WalletConnection;
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, DollarSign, Coins, Image, ExternalLink } from "lucide-react";
import { useWeb3 } from "@/contexts/Web3Context";
import { useAccountInfo, useAlgoPrice, useNFTCollection } from "@/hooks/useAlgorandData";

const Web3Portfolio = () => {
  const { isConnected, accountAddress } = useWeb3();
  const { data: accountInfo, isLoading: accountLoading } = useAccountInfo();
  const { data: algoPrice, isLoading: priceLoading } = useAlgoPrice();
  const { data: nftCollection, isLoading: nftLoading } = useNFTCollection();

  if (!isConnected || !accountAddress) {
    return (
      <Card className="p-6 bg-card border-border shadow-elevated">
        <div className="text-center">
          <p className="text-muted-foreground">Connect your wallet to view portfolio</p>
        </div>
      </Card>
    );
  }

  if (accountLoading || priceLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-20 w-full" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const algoBalance = accountInfo ? Number(accountInfo.amount) / 1_000_000 : 0;
  const algoValue = algoBalance * (algoPrice || 0);
  const nftCount = nftCollection?.length || 0;
  const assetCount = accountInfo?.assets?.length || 0;

  const portfolioStats = [
    { 
      title: "ALGO Balance", 
      value: `${algoBalance.toFixed(2)} ALGO`, 
      change: `$${algoValue.toFixed(2)}`, 
      positive: true, 
      icon: Coins 
    },
    { 
      title: "NFT Collection", 
      value: `${nftCount} NFTs`, 
      change: "Unique Assets", 
      positive: true, 
      icon: Image 
    },
    { 
      title: "Total Assets", 
      value: `${assetCount} Assets`, 
      change: "Holdings", 
      positive: true, 
      icon: DollarSign 
    },
    { 
      title: "Portfolio Value", 
      value: `$${algoValue.toFixed(2)}`, 
      change: `${algoPrice ? ((algoPrice - 0.30) / 0.30 * 100).toFixed(1) : '0'}%`, 
      positive: (algoPrice || 0) > 0.30, 
      icon: TrendingUp 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 bg-card border-border shadow-elevated hover:shadow-glow-primary transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.positive ? (
                      <TrendingUp className="w-4 h-4 text-success mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.positive ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {nftCollection && nftCollection.length > 0 && (
        <Card className="p-6 bg-card border-border shadow-elevated">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your NFT Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nftCollection.map((nft) => (
              <div key={nft.id} className="bg-secondary rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{nft.name}</h4>
                    <p className="text-sm text-muted-foreground">{nft.unitName}</p>
                    <Badge variant="outline" className="mt-2">
                      ID: {nft.id}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a 
                      href={`https://testnet.algoexplorer.io/asset/${nft.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
                {nft.url && (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {accountInfo?.assets && accountInfo.assets.length > 0 && (
        <Card className="p-6 bg-card border-border shadow-elevated">
          <h3 className="text-lg font-semibold text-foreground mb-4">Asset Holdings</h3>
          <div className="space-y-4">
            {accountInfo.assets.slice(0, 10).map((asset, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Coins className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Asset #{Number(asset['asset-id'])}</p>
                    <p className="text-sm text-muted-foreground">Amount: {Number(asset.amount)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a 
                    href={`https://testnet.algoexplorer.io/asset/${asset['asset-id']}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Web3Portfolio;
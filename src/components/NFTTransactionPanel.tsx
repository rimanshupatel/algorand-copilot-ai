import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, Coins, AlertCircle, CheckCircle } from "lucide-react";
import { useWeb3 } from "@/contexts/Web3Context";
import { AlgorandService } from "@/services/algorandService";
import { toast } from "@/hooks/use-toast";

const NFTTransactionPanel = () => {
  const { accountAddress, isConnected, signTransaction, algodClient, indexerClient } = useWeb3();
  const [recipient, setRecipient] = useState("");
  const [assetId, setAssetId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isTransacting, setIsTransacting] = useState(false);
  const [transactionType, setTransactionType] = useState<'transfer' | 'optin' | 'payment'>('transfer');

  const algorandService = new AlgorandService(algodClient, indexerClient);

  const handleTransaction = async () => {
    if (!isConnected || !accountAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (transactionType === 'transfer' && (!recipient || !assetId)) {
      toast({
        title: "Invalid Input",
        description: "Please provide recipient address and asset ID",
        variant: "destructive",
      });
      return;
    }

    if (transactionType === 'payment' && (!recipient || !amount)) {
      toast({
        title: "Invalid Input",
        description: "Please provide recipient address and amount",
        variant: "destructive",
      });
      return;
    }

    setIsTransacting(true);

    try {
      let transaction;

      switch (transactionType) {
        case 'transfer':
          transaction = await algorandService.createAssetTransferTransaction(
            accountAddress,
            recipient,
            parseInt(assetId),
            parseInt(amount) || 1
          );
          break;
        case 'optin':
          transaction = await algorandService.createAssetOptInTransaction(
            accountAddress,
            parseInt(assetId)
          );
          break;
        case 'payment':
          transaction = await algorandService.createPaymentTransaction(
            accountAddress,
            recipient,
            parseFloat(amount),
            note
          );
          break;
        default:
          throw new Error('Invalid transaction type');
      }

      const signedTxn = await signTransaction(transaction);
      const txId = await algorandService.submitTransaction(signedTxn);

      toast({
        title: "Transaction Successful",
        description: `Transaction ID: ${txId}`,
      });

      // Reset form
      setRecipient("");
      setAssetId("");
      setAmount("");
      setNote("");

    } catch (error) {
      console.error('Transaction failed:', error);
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsTransacting(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="p-6 bg-card border-border shadow-elevated">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Wallet Required</h3>
            <p className="text-muted-foreground">
              Connect your wallet to perform transactions
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border shadow-elevated">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <Send className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Transaction Panel</h3>
            <p className="text-sm text-muted-foreground">Send assets or ALGO on Algorand</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant={transactionType === 'transfer' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTransactionType('transfer')}
          >
            Transfer Asset
          </Button>
          <Button
            variant={transactionType === 'payment' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTransactionType('payment')}
          >
            Send ALGO
          </Button>
          <Button
            variant={transactionType === 'optin' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTransactionType('optin')}
          >
            Opt-in Asset
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          {transactionType !== 'optin' && (
            <div>
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter Algorand address"
                className="mt-1"
              />
            </div>
          )}

          {(transactionType === 'transfer' || transactionType === 'optin') && (
            <div>
              <Label htmlFor="assetId">Asset ID</Label>
              <Input
                id="assetId"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Enter asset ID"
                type="number"
                className="mt-1"
              />
            </div>
          )}

          {transactionType !== 'optin' && (
            <div>
              <Label htmlFor="amount">
                {transactionType === 'payment' ? 'Amount (ALGO)' : 'Amount'}
              </Label>
              <Input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={transactionType === 'payment' ? '0.001' : '1'}
                type="number"
                step={transactionType === 'payment' ? '0.000001' : '1'}
                className="mt-1"
              />
            </div>
          )}

          {transactionType === 'payment' && (
            <div>
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note to your transaction"
                className="mt-1"
                rows={3}
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Transaction Type</span>
            <Badge variant="secondary">
              {transactionType === 'transfer' && 'Asset Transfer'}
              {transactionType === 'payment' && 'ALGO Payment'}
              {transactionType === 'optin' && 'Asset Opt-in'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Network</span>
            <Badge variant="outline">Algorand Testnet</Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Est. Fee</span>
            <span className="text-foreground">0.001 ALGO</span>
          </div>
        </div>

        <Button 
          onClick={handleTransaction}
          disabled={isTransacting}
          className="w-full"
          variant="ai"
        >
          {isTransacting ? (
            <>
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {transactionType === 'transfer' && 'Transfer Asset'}
              {transactionType === 'payment' && 'Send ALGO'}
              {transactionType === 'optin' && 'Opt-in to Asset'}
            </>
          )}
        </Button>

        <div className="bg-muted rounded-lg p-4 space-y-2">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Important Notes:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>This is Algorand Testnet - use only test funds</li>
                <li>Asset transfers require the recipient to opt-in first</li>
                <li>All transactions are irreversible</li>
                <li>Minimum ALGO balance of 0.1 ALGO required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NFTTransactionPanel;
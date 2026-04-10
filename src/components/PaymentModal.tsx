import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone, CreditCard, Check } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  itemType: "video" | "music" | "picture";
}

const PRICES = {
  video: 100,
  music: 50,
  picture: 20,
};

const PaymentModal = ({ open, onClose, itemType }: PaymentModalProps) => {
  const [method, setMethod] = useState<"mpesa" | "visa" | null>(null);
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const price = PRICES[itemType];

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMethod(null);
        onClose();
      }, 2000);
    }, 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="card-glass border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl gradient-text">
            Download {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Pay <span className="text-primary font-bold">KSH {price}</span> to download your {itemType}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="font-heading text-lg text-foreground">Payment Successful!</p>
            <p className="text-muted-foreground text-sm">Your download will start shortly...</p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground font-medium">Select payment method</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMethod("mpesa")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  method === "mpesa"
                    ? "border-primary glow-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Smartphone className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-foreground">M-Pesa</span>
              </button>
              <button
                onClick={() => setMethod("visa")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  method === "visa"
                    ? "border-secondary glow-secondary bg-secondary/10"
                    : "border-border hover:border-secondary/50"
                }`}
              >
                <CreditCard className="w-8 h-8 text-secondary" />
                <span className="text-sm font-medium text-foreground">Visa / Card</span>
              </button>
            </div>

            {method === "mpesa" && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                <label className="text-sm text-muted-foreground">Phone Number</label>
                <Input
                  placeholder="0712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-muted border-border"
                />
                <p className="text-xs text-muted-foreground">You will receive an STK push on your phone</p>
              </div>
            )}

            {method === "visa" && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                <label className="text-sm text-muted-foreground">Card Number</label>
                <Input placeholder="4242 4242 4242 4242" className="bg-muted border-border" />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Expiry</label>
                    <Input placeholder="MM/YY" className="bg-muted border-border" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">CVV</label>
                    <Input placeholder="123" className="bg-muted border-border" />
                  </div>
                </div>
              </div>
            )}

            {method && (
              <Button
                onClick={handlePay}
                disabled={processing || (method === "mpesa" && !phone)}
                className="w-full gradient-primary text-primary-foreground font-heading font-semibold text-base h-12 hover:opacity-90 transition-opacity"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Pay KSH ${price}`
                )}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;

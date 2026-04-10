import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Download, Loader2, AlertCircle } from "lucide-react";
import PaymentModal from "./PaymentModal";

interface GeneratorTabProps {
  type: "video" | "music" | "picture";
  icon: React.ReactNode;
  placeholder: string;
  price: number;
}

const HF_API_KEY = import.meta.env.VITE_HF_API_KEY || "";
const HF_MODEL_ID = "stabilityai/stable-diffusion-2-1";

const GeneratorTab = ({ type, icon, placeholder, price }: GeneratorTabProps) => {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || type !== "picture") return;
    
    setGenerating(true);
    setGenerated(false);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${HF_MODEL_ID}`,
        {
          headers: { Authorization: `Bearer ${HF_API_KEY}` },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.blob();
      const url = URL.createObjectURL(result);
      setGeneratedImage(url);
      setGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate image");
      console.error("Generation error:", err);
    } finally {
      setGenerating(false);
    }
  };

  const previewContent = () => {
    if (generating) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <Sparkles className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-muted-foreground font-medium animate-pulse">Creating your {type}...</p>
          <p className="text-xs text-muted-foreground">AI magic in progress ✨</p>
        </div>
      );
    }

    if (generated) {
      return (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center">
            {type === "picture" && generatedImage && (
              <div className="w-full h-full">
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {type === "video" && (
              <div className="w-full h-full bg-gradient-to-br from-secondary/30 via-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full border-4 border-secondary flex items-center justify-center mx-auto">
                    <div className="w-0 h-0 border-l-[20px] border-l-secondary border-y-[12px] border-y-transparent ml-1" />
                  </div>
                  <p className="text-foreground font-heading font-semibold">Coming Soon</p>
                  <p className="text-xs text-muted-foreground">Video generation coming soon</p>
                </div>
              </div>
            )}
            {type === "music" && (
              <div className="w-full h-full bg-gradient-to-br from-accent/30 via-secondary/20 to-primary/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="flex items-end gap-1 justify-center h-12">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-accent rounded-full"
                        style={{
                          height: `${Math.random() * 100}%`,
                          animation: `pulse-glow ${1 + Math.random()}s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-foreground font-heading font-semibold">Coming Soon</p>
                  <p className="text-xs text-muted-foreground">Music generation coming soon</p>
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={() => setPaymentOpen(true)}
            className="w-full gradient-primary text-primary-foreground font-heading font-semibold h-12 text-base hover:opacity-90 transition-opacity"
          >
            <Download className="w-5 h-5 mr-2" />
            Download — KSH {price}
          </Button>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-foreground font-medium">Generation Failed</p>
          <p className="text-xs text-muted-foreground text-center max-w-xs">{error}</p>
          <Button 
            onClick={() => setError(null)}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          {icon}
        </div>
        <p className="font-heading text-sm">Your {type} will appear here</p>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Input */}
      <div className="space-y-4">
        <div className="card-glass rounded-xl p-6 space-y-4">
          <h3 className="font-heading text-lg text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Describe your {type}
          </h3>
          <Textarea
            placeholder={placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-muted/50 border-border min-h-[120px] resize-none text-foreground placeholder:text-muted-foreground"
            rows={5}
          />
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || generating || type !== "picture"}
            className="w-full gradient-primary text-primary-foreground font-heading font-semibold h-11 hover:opacity-90 transition-opacity"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {type === "picture" ? "Generate Picture" : `Generate ${type.charAt(0).toUpperCase() + type.slice(1)} (Coming Soon)`}
              </span>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            {type === "picture" ? "Free AI image generation using Hugging Face" : "Free to create • Pay only when downloading"}
          </p>
        </div>

        {/* Quick prompts */}
        <div className="card-glass rounded-xl p-4 space-y-3">
          <p className="text-sm text-muted-foreground font-medium">💡 Try these prompts</p>
          <div className="flex flex-wrap gap-2">
            {getQuickPrompts(type).map((p, i) => (
              <button
                key={i}
                onClick={() => setPrompt(p)}
                className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="card-glass rounded-xl p-6">
        <h3 className="font-heading text-lg text-foreground mb-4">Preview</h3>
        {previewContent()}
      </div>

      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        itemType={type}
      />
    </div>
  );
};

function getQuickPrompts(type: string): string[] {
  switch (type) {
    case "video":
      return [
        "A cinematic sunset over Nairobi skyline",
        "Product showcase for sneakers with cool effects",
        "Animated logo intro with particles",
      ];
    case "music":
      return [
        "Upbeat Afrobeat track for a party",
        "Chill lo-fi beats for studying",
        "Epic cinematic trailer music",
      ];
    case "picture":
      return [
        "A futuristic city at night with neon lights",
        "Professional headshot with blurred background",
        "Social media ad for a coffee brand",
      ];
    default:
      return [];
  }
}

export default GeneratorTab;

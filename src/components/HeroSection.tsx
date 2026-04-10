import { Sparkles, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative text-center py-12 md:py-16 px-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-secondary/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
          <Zap className="w-3 h-3" />
          AI-Powered
        </span>
      </div>

      <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
        <span className="gradient-text">Create Amazing</span>
        <br />
        <span className="text-foreground">Content with AI</span>
      </h1>

      <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-6">
        Generate stunning videos, music, pictures & ads in seconds.
        <br className="hidden sm:block" />
        No account needed — just create and download.
      </p>

      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-primary" />
          Free to create
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-secondary" />
          Pay to download
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-accent" />
          No signup
        </span>
      </div>
    </div>
  );
};

export default HeroSection;

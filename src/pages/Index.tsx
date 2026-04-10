import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Music, Image, Megaphone } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import GeneratorTab from "@/components/GeneratorTab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold gradient-text">NEXAKO</h2>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted">
              No account needed ✨
            </span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pb-16">
        <HeroSection />

        {/* Pricing pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full card-glass text-sm">
            <Video className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">Videos</span>
            <span className="text-foreground font-bold font-heading">KSH 100</span>
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full card-glass text-sm">
            <Music className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">Music</span>
            <span className="text-foreground font-bold font-heading">KSH 50</span>
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full card-glass text-sm">
            <Image className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Pictures</span>
            <span className="text-foreground font-bold font-heading">KSH 20</span>
          </span>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pictures" className="w-full max-w-5xl mx-auto">
          <TabsList className="w-full grid grid-cols-4 bg-muted/50 border border-border rounded-xl p-1 h-auto">
            <TabsTrigger
              value="videos"
              className="flex items-center gap-2 py-3 rounded-lg font-heading font-medium data-[state=active]:gradient-secondary data-[state=active]:text-secondary-foreground transition-all"
            >
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger
              value="music"
              className="flex items-center gap-2 py-3 rounded-lg font-heading font-medium data-[state=active]:gradient-accent data-[state=active]:text-accent-foreground transition-all"
            >
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Music</span>
            </TabsTrigger>
            <TabsTrigger
              value="pictures"
              className="flex items-center gap-2 py-3 rounded-lg font-heading font-medium data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Pictures</span>
            </TabsTrigger>
            <TabsTrigger
              value="ads"
              className="flex items-center gap-2 py-3 rounded-lg font-heading font-medium data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
            >
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">Ads</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="videos">
              <GeneratorTab
                type="video"
                icon={<Video className="w-8 h-8 text-secondary" />}
                placeholder="Describe the video you want to create... e.g., 'A 30-second product showcase for a new phone with cinematic transitions'"
                price={100}
              />
            </TabsContent>
            <TabsContent value="music">
              <GeneratorTab
                type="music"
                icon={<Music className="w-8 h-8 text-accent" />}
                placeholder="Describe the music track you want... e.g., 'An upbeat Afrobeat instrumental with drums and guitar, 2 minutes long'"
                price={50}
              />
            </TabsContent>
            <TabsContent value="pictures">
              <GeneratorTab
                type="picture"
                icon={<Image className="w-8 h-8 text-primary" />}
                placeholder="Describe the image you want... e.g., 'A professional social media post for a restaurant with warm lighting'"
                price={20}
              />
            </TabsContent>
            <TabsContent value="ads">
              <GeneratorTab
                type="picture"
                icon={<Megaphone className="w-8 h-8 text-foreground" />}
                placeholder="Describe the ad you want to create... e.g., 'A Facebook ad for a fashion brand sale with bold text and vibrant colors'"
                price={20}
              />
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <footer className="text-center mt-16 py-8 border-t border-border">
          <p className="font-heading text-lg gradient-text font-bold mb-1">NEXAKO</p>
          <p className="text-xs text-muted-foreground">AI-powered content creation • Pay per download • No signup required</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

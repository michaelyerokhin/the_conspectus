import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { DiscoverySection } from "./components/sections/DiscoverySection";
import { FocusSection } from "./components/sections/FocusSection";
import { HeroSection } from "./components/sections/HeroSection";
import { LibrarySection } from "./components/sections/LibrarySection";
import { SituationRoomSection } from "./components/sections/SituationRoomSection";
import { TrendingTopicsSection } from "./components/sections/TrendingTopicsSection";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#f6f8fc] text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_70%)]" />
      <SiteHeader />

      <main className="relative z-10 flex-1">
        <HeroSection />
        <SituationRoomSection />
        <LibrarySection />
        <TrendingTopicsSection />
        <DiscoverySection />
        <FocusSection />
      </main>

      <SiteFooter />
    </div>
  );
}

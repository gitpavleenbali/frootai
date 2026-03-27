import { Hero } from "@/components/sections/hero";
import { EcosystemGrid } from "@/components/sections/ecosystem-grid";
import { Stats } from "@/components/sections/stats";
import { FrootLayers } from "@/components/sections/froot-layers";
import { Outcomes } from "@/components/sections/outcomes";
import { CtaHome } from "@/components/sections/cta-home";

export default function Home() {
  return (
    <>
      <Hero />
      <EcosystemGrid />
      <Stats />
      <FrootLayers />
      <Outcomes />
      <CtaHome />
    </>
  );
}

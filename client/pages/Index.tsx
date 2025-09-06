import Hero from "@/components/kissanai/Hero";
import ComparisonSlider from "@/components/kissanai/ComparisonSlider";
import FeaturesTabs from "@/components/kissanai/FeaturesTabs";
import Carousel3D from "@/components/kissanai/Carousel3D";

export default function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <ComparisonSlider />
      <FeaturesTabs />
      <Carousel3D />
    </div>
  );
}

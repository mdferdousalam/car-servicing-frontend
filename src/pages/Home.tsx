import FeaturedServices from "../components/ui/home/FeaturedSection";
import HeroSection from "../components/ui/home/HeroSection";
import ReviewSection from "../components/ui/home/ReviewSection";

interface HomePageProps {
  isLoggedIn?: boolean;
}
export default function HomePage({ isLoggedIn = false }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <ReviewSection isLoggedIn={isLoggedIn} />
    </>
  );
}

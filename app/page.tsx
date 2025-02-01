import BackgroundVideo from '@/components/bg-video/idex';
import HeroSection from "@/components/hero-section";
import HomePromerties from "@/components/home-promerties";
import InfoBoxes from "@/components/info-boxes";
import { checkUser } from "@/lib/userDb";


export default async function Home() {


  return (
    <>
    
      <BackgroundVideo />
      <HeroSection />
      <InfoBoxes />
      <HomePromerties />
    </>
  );
}

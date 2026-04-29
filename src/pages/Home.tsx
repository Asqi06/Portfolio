import Hero from '../components/Hero';
import BrandSection from '../components/BrandSection';
import PortfolioSection from '../components/PortfolioSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/FaqSection';

interface HomeProps {
  onMenuClick: () => void;
}

export default function Home({ onMenuClick }: HomeProps) {
  return (
    <>
      {/* We pass down onMenuClick to Hero so it can open the Sidebar */}
      <Hero onMenuClick={onMenuClick} />
      <BrandSection />
      <PortfolioSection />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}

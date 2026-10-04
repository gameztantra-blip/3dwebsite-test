import { useState } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { CinematicVideo } from './components/media/CinematicVideo';
import { Features } from './components/features/Features';
import { CoreExperience3D } from './components/experience3d/CoreExperience3D';
import { TechnologyFlow } from './components/technology/TechnologyFlow';
import { UseCases } from './components/usecases/UseCases';
import { Metrics } from './components/metrics/Metrics';
import { ContactForm } from './components/contact/ContactForm';
import { Footer } from './components/footer/Footer';

export default function App() {
  const [selectedUseCase, setSelectedUseCase] = useState<string>('');

  const handleStartBuilding = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectUseCase = (useCaseTitle: string) => {
    setSelectedUseCase(useCaseTitle);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Sticky Glass Navigation */}
      <Navbar onOpenGetStarted={handleStartBuilding} />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section with 3D AI Core */}
        <Hero onStartBuilding={handleStartBuilding} />

        {/* 2. Cinematic AI Media Section */}
        <CinematicVideo videoSrc="/assets/ai-hero-video.mp4" />

        {/* 3. Core Capabilities & Feature Cards */}
        <Features />

        {/* 4. Dedicated Interactive 3D Spatial Core Experience */}
        <CoreExperience3D />

        {/* 5. Technology Pipeline & Data Flow */}
        <TechnologyFlow />

        {/* 6. Production Use Cases */}
        <UseCases onSelectUseCase={handleSelectUseCase} />

        {/* 7. Animated Enterprise Metrics */}
        <Metrics />

        {/* 8. Supabase Integrated Contact Consultation */}
        <ContactForm initialSubject={selectedUseCase} />
      </main>

      {/* 9. Clean Enterprise Footer */}
      <Footer />
    </div>
  );
}

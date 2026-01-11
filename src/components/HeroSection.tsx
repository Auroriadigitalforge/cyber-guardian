import { Shield, Zap, Globe, Phone, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartReport: () => void;
}

export function HeroSection({ onStartReport }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero cyber-grid">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full animate-radar opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Shield Icon */}
          <div className="mb-8 fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/30 box-glow pulse-glow">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Cyber</span>
            <span className="text-primary text-glow">Shield</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 fade-in" style={{ animationDelay: '0.2s' }}>
            Global Cyber Crime Reporting & Protection
          </p>

          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 fade-in" style={{ animationDelay: '0.3s' }}>
            Got scammed? Report it in seconds. Our AI analyzes your case and connects you 
            directly with your country's cyber crime authorities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="glow" size="xl" onClick={onStartReport}>
              <Zap className="w-5 h-5" />
              Report a Scam Now
            </Button>
            <Button variant="cyber" size="xl">
              <Phone className="w-5 h-5" />
              Emergency Hotlines
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in" style={{ animationDelay: '0.5s' }}>
            <FeatureCard
              icon={<Clock className="w-6 h-6 text-primary" />}
              title="30-Second Analysis"
              description="AI-powered rapid case analysis and documentation"
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-primary" />}
              title="Global Coverage"
              description="Connected to cyber crime units in 100+ countries"
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-primary" />}
              title="Auto-Report"
              description="Generates professional reports for authorities"
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Shield, Scan, FileSearch, Database, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanningAnimationProps {
  isActive: boolean;
  platform: string;
  onComplete: () => void;
}

const scanSteps = [
  { icon: Scan, label: "Initiating secure connection...", duration: 4 },
  { icon: FileSearch, label: "Analyzing message patterns...", duration: 8 },
  { icon: Database, label: "Cross-referencing scam database...", duration: 6 },
  { icon: Shield, label: "Generating threat assessment...", duration: 6 },
  { icon: CheckCircle, label: "Report ready for submission", duration: 3 },
];

export function ScanningAnimation({ isActive, platform, onComplete }: ScanningAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let totalTime = 0;
    const stepTimes = scanSteps.map(step => {
      const start = totalTime;
      totalTime += step.duration;
      return { start, end: totalTime };
    });

    const totalDuration = totalTime * 100; // Convert to ms scale
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min((elapsed / totalDuration) * 100, 100);
      
      setProgress(currentProgress);

      // Find current step
      const elapsedSeconds = elapsed / 100;
      for (let i = 0; i < stepTimes.length; i++) {
        if (elapsedSeconds >= stepTimes[i].start && elapsedSeconds < stepTimes[i].end) {
          setCurrentStep(i);
          break;
        }
      }

      if (currentProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setCurrentStep(scanSteps.length - 1);
        setTimeout(onComplete, 500);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const CurrentIcon = scanSteps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-lg">
      <div className="max-w-md w-full mx-4 text-center">
        {/* Radar Animation */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute inset-4 rounded-full border border-primary/30" />
          <div className="absolute inset-8 rounded-full border border-primary/40" />
          
          {/* Scanning line */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div 
              className="absolute inset-0 origin-center animate-radar"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.3) 30deg, transparent 60deg)"
              }}
            />
          </div>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center pulse-glow">
              <CurrentIcon className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Blips */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-2 h-2 rounded-full bg-primary transition-opacity duration-500",
                progress > (i + 1) * 20 ? "opacity-100" : "opacity-0"
              )}
              style={{
                top: `${30 + Math.sin(i * 1.2) * 40}%`,
                left: `${30 + Math.cos(i * 1.2) * 40}%`,
              }}
            />
          ))}
        </div>

        {/* Platform being scanned */}
        <h2 className="text-2xl font-bold mb-2">
          Scanning <span className="text-primary text-glow">{platform}</span>
        </h2>

        {/* Current step */}
        <p className="text-muted-foreground mb-6">
          {scanSteps[currentStep].label}
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden mb-4">
          <div 
            className="h-full bg-primary transition-all duration-100 rounded-full box-glow"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="font-mono text-primary text-lg">
          {Math.round(progress)}%
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {scanSteps.map((step, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i <= currentStep ? "bg-primary box-glow" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

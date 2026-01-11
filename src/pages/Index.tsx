import { useState, useCallback } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CountrySelector } from "@/components/CountrySelector";
import { ScamTypeSelector } from "@/components/ScamTypeSelector";
import { ChatInterface } from "@/components/ChatInterface";
import { ScanningAnimation } from "@/components/ScanningAnimation";
import { ReportGenerator } from "@/components/ReportGenerator";
import { CountryInfo, scamTypes } from "@/data/cyberData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

type Step = "hero" | "country" | "scamType" | "describe" | "scanning" | "report" | "success";

const Index = () => {
  const [step, setStep] = useState<Step>("hero");
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [selectedScamType, setSelectedScamType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleStartReport = () => {
    setStep("country");
  };

  const handleCountrySelect = (country: CountryInfo) => {
    setSelectedCountry(country);
  };

  const handleScamSelect = (id: string) => {
    setSelectedScamType(id);
  };

  const handleScanComplete = useCallback(() => {
    setStep("report");
  }, []);

  const handleSendReport = () => {
    setStep("success");
    toast({
      title: "Report Submitted Successfully",
      description: `Your report has been sent to ${selectedCountry?.cyberCrimeUnit}. They will contact you soon.`,
    });
  };

  const handleNewReport = () => {
    setStep("hero");
    setSelectedCountry(null);
    setSelectedScamType(null);
    setDescription("");
  };

  const scamLabel = scamTypes.find(s => s.id === selectedScamType)?.label || "Platform";

  return (
    <>
      <Helmet>
        <title>CyberShield - Global Cyber Crime Reporting & Protection</title>
        <meta name="description" content="Report online scams and fraud instantly. CyberShield connects you with cyber crime authorities worldwide. 30-second AI analysis, auto-generated reports, and emergency hotlines for 100+ countries." />
        <meta name="keywords" content="cyber security, scam report, fraud protection, online safety, cyber crime, WhatsApp scam, phishing, identity theft" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Scanning Animation Overlay */}
        <ScanningAnimation 
          isActive={step === "scanning"} 
          platform={scamLabel}
          onComplete={handleScanComplete}
        />

        {/* Hero Section */}
        {step === "hero" && <HeroSection onStartReport={handleStartReport} />}

        {/* Report Flow Steps */}
        {step !== "hero" && step !== "scanning" && step !== "success" && (
          <div className="min-h-screen gradient-hero cyber-grid py-12 px-4">
            <div className="container max-w-3xl mx-auto">
              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {["country", "scamType", "describe", "report"].map((s, i) => (
                  <div key={s} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        step === s 
                          ? "bg-primary text-primary-foreground box-glow" 
                          : ["country", "scamType", "describe", "report"].indexOf(step) > i
                            ? "bg-primary/50 text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </div>
                    {i < 3 && <div className="w-12 h-0.5 bg-border mx-1" />}
                  </div>
                ))}
              </div>

              {/* Back Button */}
              {step !== "country" && step !== "report" && (
                <Button
                  variant="ghost"
                  className="mb-6"
                  onClick={() => {
                    const steps: Step[] = ["country", "scamType", "describe", "report"];
                    const currentIndex = steps.indexOf(step);
                    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}

              {/* Step 1: Country Selection */}
              {step === "country" && (
                <Card variant="elevated" className="fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Where are you located?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      Select your country so we can connect you with the right cyber crime authority.
                    </p>
                    <CountrySelector 
                      selectedCountry={selectedCountry} 
                      onSelect={handleCountrySelect} 
                    />
                    <Button 
                      variant="glow" 
                      className="w-full"
                      disabled={!selectedCountry}
                      onClick={() => setStep("scamType")}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Scam Type Selection */}
              {step === "scamType" && (
                <Card variant="elevated" className="fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      What happened?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      Select the type of scam or cyber crime you experienced.
                    </p>
                    <ScamTypeSelector 
                      selected={selectedScamType} 
                      onSelect={handleScamSelect} 
                    />
                    <Button 
                      variant="glow" 
                      className="w-full"
                      disabled={!selectedScamType}
                      onClick={() => setStep("describe")}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Description */}
              {step === "describe" && (
                <Card variant="elevated" className="fade-in">
                  <CardHeader>
                    <CardTitle>Describe the Incident</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      Tell us what happened. Include any details like dates, amounts, phone numbers, or usernames involved.
                    </p>
                    <Textarea
                      variant="cyber"
                      placeholder="Example: I received a WhatsApp message from +91-XXXXX claiming to be from my bank. They asked for my OTP and I shared it. Then ₹50,000 was debited from my account..."
                      className="min-h-[200px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex gap-3">
                      <Button 
                        variant="glow" 
                        className="flex-1"
                        disabled={description.length < 20}
                        onClick={() => setStep("scanning")}
                      >
                        Analyze & Generate Report
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Your information is encrypted and securely processed.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Report */}
              {step === "report" && selectedCountry && selectedScamType && (
                <ReportGenerator
                  country={selectedCountry}
                  scamType={selectedScamType}
                  description={description}
                  onSendReport={handleSendReport}
                />
              )}
            </div>
          </div>
        )}

        {/* Success State */}
        {step === "success" && (
          <div className="min-h-screen gradient-hero cyber-grid flex items-center justify-center p-4">
            <Card variant="glow" className="max-w-lg w-full text-center fade-in">
              <CardContent className="p-8">
                <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6 pulse-glow">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Report Submitted!</h2>
                <p className="text-muted-foreground mb-6">
                  Your cyber crime report has been sent to {selectedCountry?.cyberCrimeUnit}. 
                  They will review your case and may contact you for additional information.
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
                  <p className="font-mono text-lg text-primary">CS-{Date.now().toString(36).toUpperCase()}</p>
                </div>
                <div className="space-y-3">
                  <Button variant="glow" className="w-full" onClick={handleNewReport}>
                    Report Another Incident
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`tel:${selectedCountry?.emergencyNumber.replace(/\s/g, '')}`}>
                      📞 Call Emergency Hotline
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </>
  );
};

export default Index;

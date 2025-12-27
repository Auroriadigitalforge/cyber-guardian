import { useState } from "react";
import { CountryInfo, countries } from "@/data/cyberData";
import { ChevronDown, Globe, Phone, ExternalLink, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountrySelectorProps {
  selectedCountry: CountryInfo | null;
  onSelect: (country: CountryInfo) => void;
}

export function CountrySelector({ selectedCountry, onSelect }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        <Globe className="w-4 h-4 inline mr-2" />
        Your Location / Country
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-300",
          selectedCountry 
            ? "border-primary/50 bg-primary/5 box-glow" 
            : "border-border bg-secondary/50 hover:border-primary/30"
        )}
      >
        {selectedCountry ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedCountry.flag}</span>
            <div className="text-left">
              <div className="font-medium">{selectedCountry.name}</div>
              <div className="text-sm text-muted-foreground">{selectedCountry.cyberCrimeUnit}</div>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">Select your country...</span>
        )}
        <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-lg border border-border bg-card shadow-xl overflow-hidden">
          <div className="p-3 border-b border-border">
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-sm"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onSelect(country);
                  setIsOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-3 hover:bg-primary/10 transition-colors text-left",
                  selectedCountry?.code === country.code && "bg-primary/10"
                )}
              >
                <span className="text-xl">{country.flag}</span>
                <div>
                  <div className="font-medium">{country.name}</div>
                  <div className="text-xs text-muted-foreground">{country.cyberCrimeUnit}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Country Contact Info */}
      {selectedCountry && (
        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3 slide-up">
          <h4 className="font-medium text-primary flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Emergency Cyber Crime Hotline
          </h4>
          <div className="text-2xl font-mono font-bold text-foreground">
            {selectedCountry.emergencyNumber}
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a 
              href={selectedCountry.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              Official Website
            </a>
            <a 
              href={`mailto:${selectedCountry.email}`}
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <Mail className="w-3 h-3" />
              {selectedCountry.email}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

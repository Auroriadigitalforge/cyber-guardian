import { scamTypes } from "@/data/cyberData";
import { cn } from "@/lib/utils";

interface ScamTypeSelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function ScamTypeSelector({ selected, onSelect }: ScamTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted-foreground mb-3">
        What type of scam did you experience?
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {scamTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelect(type.id)}
            className={cn(
              "p-4 rounded-lg border text-left transition-all duration-300 hover:scale-[1.02]",
              selected === type.id
                ? "border-primary bg-primary/10 box-glow"
                : "border-border bg-secondary/30 hover:border-primary/30"
            )}
          >
            <div className="text-2xl mb-2">{type.icon}</div>
            <div className="font-medium text-sm leading-tight">{type.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

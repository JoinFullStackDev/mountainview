import { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description?: string;
  icon?: ReactNode;
}

interface FeatureListProps {
  features: Feature[];
  columns?: 1 | 2 | 3;
  variant?: "default" | "check" | "icon";
  className?: string;
}

export function FeatureList({
  features,
  columns = 2,
  variant = "check",
  className,
}: FeatureListProps) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <ul className={cn("grid gap-4", gridClasses[columns], className)}>
      {features.map((feature, index) => (
        <li key={index} className="flex gap-3">
          <div
            className={cn(
              "flex-shrink-0 mt-1",
              variant === "check" &&
                "flex h-5 w-5 items-center justify-center rounded-full bg-primary/10"
            )}
          >
            {variant === "check" ? (
              <Check className="h-3 w-3 text-primary" />
            ) : (
              feature.icon
            )}
          </div>
          <div>
            <span className="font-medium text-foreground">{feature.title}</span>
            {feature.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

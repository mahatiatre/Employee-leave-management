
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  icon: ReactNode;
  description?: string;
  className?: string;
  delay?: number;
  stats?: string;
  variant?: "gradient" | "light" | "white";
  iconBg?: string;
}

const FeatureCard = ({
  title,
  icon,
  description,
  className,
  delay = 0,
  stats,
  variant = "gradient",
  iconBg,
}: FeatureCardProps) => {
  const delayClass = delay ? `animate-delay-${delay}` : "";

  const variantClasses = {
    gradient: "bg-blue-gradient text-white",
    light: "bg-blue-light/10 border border-blue-light/20",
    white: "bg-white border border-gray-100 shadow-sm",
  };

  return (
    <div
      className={cn(
        "rounded-3xl overflow-hidden animate-rotate-in opacity-0",
        variantClasses[variant],
        delayClass,
        className
      )}
    >
      <div className="flex flex-col items-center p-8 h-full">
        <div className={cn("mb-6 w-full", iconBg)}>
          {icon}
        </div>
        <div className={cn(
          "rounded-full px-6 py-2 mb-4 font-bold",
          variant === "gradient" ? "bg-white text-blue" : "bg-blue text-white"
        )}>
          {title}
        </div>
        {stats && (
          <div className={cn(
            "rounded-lg px-4 py-1 mb-4 text-xl font-bold",
            variant === "gradient" ? "bg-white/20 text-white" : "bg-blue/10 text-blue"
          )}>
            {stats}
          </div>
        )}
        {description && (
          <p className={cn(
            "text-center",
            variant === "gradient" ? "text-white" : "text-gray-600"
          )}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;

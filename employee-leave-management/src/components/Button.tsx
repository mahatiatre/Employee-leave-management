
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "gradient";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  withArrow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      icon,
      iconPosition = "left",
      loading = false,
      withArrow = false,
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5",
      lg: "px-6 py-3 text-lg",
    };

    // Variant classes
    const variantClasses = {
      default: "bg-blue text-white hover:bg-blue-dark",
      outline: "bg-transparent border border-blue text-blue hover:bg-blue/10",
      ghost: "bg-transparent text-blue hover:bg-blue/10",
      link: "bg-transparent text-blue underline-offset-4 hover:underline p-0",
      gradient: "bg-blue-gradient text-white hover:opacity-90",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-full font-medium inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-70 disabled:pointer-events-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && iconPosition === "left" && !loading && icon}
        {children}
        {icon && iconPosition === "right" && icon}
        {withArrow && <ArrowRight className="w-4 h-4 ml-1" />}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

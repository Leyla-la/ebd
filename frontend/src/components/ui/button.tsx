
import * as React from "react";

type ButtonVariant = "default" | "ghost" | "destructive" | "outline";

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  default: {
    background: "rgba(255,255,255,0.7)",
    color: "#222",
    border: "1px solid #e5e7eb",
  },
  ghost: {
    background: "transparent",
    color: "#222",
    border: "1px solid transparent",
  },
  destructive: {
    background: "#ef4444",
    color: "#fff",
    border: "1px solid #ef4444",
  },
  outline: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.12)",
  },
};

type ButtonSize = "default" | "icon" | "sm" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", style = {}, children, variant = "default", size = "default", ...props }, ref) => {
    const sizeClass =
      size === "icon"
        ? "p-2 w-10 h-10 flex items-center justify-center rounded-full"
        : size === "sm"
        ? "px-3 py-1 text-sm rounded"
        : size === "lg"
        ? "px-10 py-4 text-lg rounded-md"
        : "px-8 py-3";
    return (
      <button
        ref={ref}
        className={`liquid-glass-btn relative overflow-hidden font-semibold text-base transition ${sizeClass} ${className}`}
        style={{ ...variantStyles[variant], ...style }}
        {...props}
      >
        <span className="liquid-glass-shine" aria-hidden="true" />
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

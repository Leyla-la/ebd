
import * as React from "react";
import LiquidGlass from "liquid-glass-react";

type ButtonVariant = "default" | "ghost" | "destructive";

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
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", style = {}, children, variant = "default", ...props }, ref) => (
    <LiquidGlass
      displacementScale={60}
      blurAmount={0.06}
      saturation={160}
      elasticity={0.15}
      mode="standard"
      cornerRadius={16}
      style={{ display: "inline-block", borderRadius: 16, ...style }}
      className={className}
      onClick={typeof props.onClick === "function" ? () => props.onClick && props.onClick({} as any) : undefined}
    >
      <button
        ref={ref}
        style={{
          ...variantStyles[variant],
          fontWeight: 600,
          fontSize: 16,
          padding: "12px 32px",
          borderRadius: 16,
          cursor: "pointer",
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    </LiquidGlass>
  )
);
Button.displayName = "Button";

export { Button };

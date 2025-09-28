import * as React from "react";
import LiquidGlass from "liquid-glass-react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", style = {}, children, ...props }, ref) => (
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
        background: "transparent",
        border: "none",
        color: "inherit",
        fontWeight: 600,
        fontSize: 16,
        padding: "12px 32px",
        borderRadius: 16,
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </button>
  </LiquidGlass>
));
Button.displayName = "Button";

export { Button };

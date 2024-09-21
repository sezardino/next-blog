import { cn } from "@/utils/styles";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
      variant: {
        default: "",
        outline: "border border-input hover:text-white",
        ghost: "",
        link: "underline-offset-4 hover:underline h-auto !p-0",
      },
      color: {
        primary: "",
        secondary: "",
        destructive: "",
        warning: "",
        info: "",
        success: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        color: "primary",
        className: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        variant: "default",
        color: "secondary",
        className: "bg-secondary text-white-foreground hover:bg-secondary/80",
      },
      {
        variant: "default",
        color: "destructive",
        className:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      {
        variant: "default",
        color: "warning",
        className: "bg-yellow-600 text-white hover:bg-yellow-600/90",
      },
      {
        variant: "default",
        color: "info",
        className: "bg-blue-500 text-white hover:bg-blue-500/90",
      },
      {
        variant: "default",
        color: "success",
        className: "bg-green-500 text-white hover:bg-green-500/90",
      },

      // For the outline variant
      {
        variant: "outline",
        color: "primary",
        className: "border-primary text-primary hover:bg-primary",
      },
      {
        variant: "outline",
        color: "secondary",
        className: "border-secondary text-white hover:bg-secondary",
      },
      {
        variant: "outline",
        color: "destructive",
        className: "border-destructive text-destructive hover:bg-destructive",
      },
      {
        variant: "outline",
        color: "warning",
        className: "border-yellow-500 text-yellow-500 hover:bg-yellow-500",
      },
      {
        variant: "outline",
        color: "info",
        className: "border-blue-500 text-blue-500 hover:bg-blue-500",
      },
      {
        variant: "outline",
        color: "success",
        className: "border-green-500 text-green-500 hover:bg-green-500",
      },

      // Ghost variant colors
      {
        variant: "ghost",
        color: "primary",
        className: "text-primary hover:bg-primary/20",
      },
      {
        variant: "ghost",
        color: "secondary",
        className: "text-white hover:bg-secondary",
      },
      {
        variant: "ghost",
        color: "destructive",
        className: "text-destructive hover:bg-destructive/20",
      },
      {
        variant: "ghost",
        color: "warning",
        className: "text-yellow-500 hover:bg-yellow-500/20",
      },
      {
        variant: "ghost",
        color: "info",
        className: "text-blue-500 hover:bg-blue-500/20",
      },
      {
        variant: "ghost",
        color: "success",
        className: "text-green-500 hover:bg-green-500/20",
      },

      // For the link variant (only text color change)
      {
        variant: "link",
        color: "primary",
        className: "text-primary hover:text-primary/80",
      },
      {
        variant: "link",
        color: "secondary",
        className: "text-secondary hover:text-secondary/80",
      },
      {
        variant: "link",
        color: "destructive",
        className: "text-destructive hover:text-destructive/80",
      },
      {
        variant: "link",
        color: "warning",
        className: "text-yellow-500 hover:text-yellow-500/80",
      },
      {
        variant: "link",
        color: "info",
        className: "text-blue-500 hover:text-blue-500/80",
      },
      {
        variant: "link",
        color: "success",
        className: "text-green-500 hover:text-green-500/80",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        type="button"
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

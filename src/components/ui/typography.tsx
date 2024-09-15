import { cn } from "@/utils/styles";
import { Slot } from "@radix-ui/react-slot";
import {
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";

type TypographyStyling =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "base"
  | "lead"
  | "large"
  | "small"
  | "xs"
  | "xxs";

const stylingMap: Record<TypographyStyling, string> = {
  h1: "text-4xl lg:text-5xl tracking-tight",
  h2: "text-3xl tracking-tight",
  h3: "text-2xl tracking-tight",
  h4: "text-xl tracking-tight",
  base: "text-base leading-7",
  lead: "text-xl",
  large: "text-lg",
  small: "text-sm",
  xs: "text-xs",
  xxs: "text-[10px]",
};

type TypographyWeight = "light" | "normal" | "medium" | "bold";

const weightMap: Record<TypographyWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

type Props = {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  asChild?: boolean;
  styling?: TypographyStyling;
  weight?: TypographyWeight;
  isMuted?: boolean;
  isUnderlined?: boolean;
  isUppercase?: boolean;
};

export type TypographyProps = ComponentPropsWithRef<"p"> & Props;

const TypographyComponent: ForwardRefRenderFunction<
  HTMLParagraphElement,
  TypographyProps
> = (props, ref) => {
  const {
    level,
    weight = "normal",
    styling = "base",
    asChild = false,
    isUppercase = false,
    isUnderlined,
    isMuted,
    className,
    children,
    ...rest
  } = props;

  const Comp = level ? level : asChild ? Slot : "p";

  return (
    <Comp
      {...rest}
      ref={ref}
      className={cn(
        stylingMap[styling],
        weightMap[weight],
        isUnderlined && "underline",
        isMuted && "text-muted-foreground",
        isUppercase && "uppercase",
        className
      )}
    >
      {children}
    </Comp>
  );
};

export const Typography = forwardRef(TypographyComponent);

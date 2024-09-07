import { cn } from "@/utils/styles";
import { Button, ButtonProps } from "../ui/button";

type HamburgerButtonProps = ButtonProps & {
  isActive: boolean;
};

export const HamburgerButton = (props: HamburgerButtonProps) => {
  const { isActive, className, children, ...rest } = props;

  return (
    <Button
      {...rest}
      size={"icon"}
      color="secondary"
      className={cn(
        "relative flex overflow-hidden items-center justify-center transform transition-all duration-200 shadow-md",
        className
      )}
    >
      <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
        <div
          className={cn(
            "bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-100",
            isActive && "translate-y-6"
          )}
        />
        <div
          className={cn(
            "bg-white h-[2px] w-7 rounded transform transition-all duration-300 delay-75",
            isActive && "translate-y-6"
          )}
        />
        <div
          className={cn(
            "bg-white h-[2px] w-7 transform transition-all duration-300 origin-left",
            isActive && "translate-y-6"
          )}
        />

        <div
          className={cn(
            "absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 flex w-0",
            isActive && "translate-x-0 w-12"
          )}
        >
          <div
            className={cn(
              "absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300",
              isActive && "rotate-45"
            )}
          />
          <div
            className={cn(
              "absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300",
              isActive && "-rotate-45"
            )}
          />
        </div>
      </div>
      {children}
    </Button>
  );
};

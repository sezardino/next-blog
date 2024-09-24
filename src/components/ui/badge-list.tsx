import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef } from "react";
import { Badge, BadgeProps } from "./badge";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";

type PickedProps = Pick<BadgeProps, "variant" | "size">;

type BadgeListProps = ComponentPropsWithoutRef<"ul"> &
  PickedProps & {
    list: string[];
    maxLength?: number;
  };

export const BadgeList = (props: BadgeListProps) => {
  const { list, maxLength = 5, variant, size, className, ...rest } = props;

  const visibleList = list.slice(0, maxLength);
  const notVisibleList = list.slice(maxLength);

  return (
    <ul {...rest} className={cn("flex flex-wrap gap-1", className)}>
      {visibleList.map((item, index) => (
        <Badge key={index} asChild variant={variant} size={size}>
          <li>{item}</li>
        </Badge>
      ))}
      {!!notVisibleList.length && (
        <Popover>
          <PopoverTrigger>
            <Badge variant={variant} size={size}>
              ...
            </Badge>
          </PopoverTrigger>
          <PopoverContent asChild>
            <ScrollArea className="h-40 p-0">
              <ul className="flex flex-wrap gap-1 p-4">
                {notVisibleList.map((item, index) => (
                  <Badge key={index} asChild variant={variant} size={size}>
                    <li>{item}</li>
                  </Badge>
                ))}
              </ul>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      )}
    </ul>
  );
};

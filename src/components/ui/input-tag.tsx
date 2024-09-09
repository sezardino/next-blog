import { cn } from "@/utils/styles";
import { X } from "lucide-react";
import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Button } from "./button";
import { Input } from "./input";

type InputTagProps = Omit<ComponentPropsWithoutRef<"div">, "onChange"> & {
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
};

const InputTag = forwardRef<ElementRef<"div">, InputTagProps>((props, ref) => {
  const { placeholder, value, onChange, className, ...rest } = props;

  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue("");
    }
  };

  const removeItem = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div ref={ref} {...rest} className={className}>
      <div
        className={`flex flex-wrap gap-2 rounded-md ${
          value.length !== 0 && "mb-3"
        }`}
      >
        {value.map((item, index) => (
          <span
            key={index}
            className="transition-all border bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-8 items-center text-sm pl-2 rounded-md"
          >
            {item}
            <Button
              type="button"
              variant="ghost"
              onClick={() => removeItem(item)}
              className={cn("py-1 px-3 h-full hover:bg-transparent")}
            >
              <X size={14} />
            </Button>
          </span>
        ))}
      </div>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
});

InputTag.displayName = "InputTag";

export { InputTag };

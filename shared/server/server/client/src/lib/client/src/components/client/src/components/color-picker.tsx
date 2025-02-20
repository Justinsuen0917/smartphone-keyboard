import { useCallback } from "react";
import { ChromePicker } from "react-color";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const handleChange = useCallback(
    (color: { hex: string }) => {
      onChange(color.hex);
    },
    [onChange]
  );

  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-sm font-medium">{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-16 h-8"
            style={{ backgroundColor: color }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-none">
          <ChromePicker color={color} onChange={handleChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

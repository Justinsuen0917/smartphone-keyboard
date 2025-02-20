import { useRef } from "react";
import { motion } from "framer-motion";
import { KeyboardPreview } from "./keyboard-preview";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColorTheme } from "@shared/schema";

interface KeyboardGalleryProps {
  themes: { name: string; colors: ColorTheme }[];
  onThemeSelect: (theme: ColorTheme) => void;
}

export function KeyboardGallery({ themes, onThemeSelect }: KeyboardGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex space-x-4 p-4" ref={scrollRef}>
        {themes.map((theme, i) => (
          <motion.div
            key={i}
            className="shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-sm font-medium mb-2">{theme.name}</div>
            <KeyboardPreview
              theme={theme.colors}
              onClick={() => onThemeSelect(theme.colors)}
            />
          </motion.div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

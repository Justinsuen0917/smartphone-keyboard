import { motion } from "framer-motion";
import { ColorTheme } from "@shared/schema";

interface KeyboardPreviewProps {
  theme: ColorTheme;
  onClick?: () => void;
}

export function KeyboardPreview({ theme, onClick }: KeyboardPreviewProps) {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
  ];

  return (
    <motion.div
      className="w-80 p-4 rounded-lg"
      style={{ backgroundColor: theme.background }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {keys.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-1">
          {row.map((key) => (
            <motion.div
              key={key}
              className="w-8 h-10 rounded flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: theme.keys,
                color: theme.text
              }}
              whileHover={{ backgroundColor: theme.accent }}
            >
              {key}
            </motion.div>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <motion.div
          className="w-48 h-10 rounded"
          style={{
            backgroundColor: theme.keys,
            color: theme.text
          }}
          whileHover={{ backgroundColor: theme.accent }}
        />
      </div>
    </motion.div>
  );
}

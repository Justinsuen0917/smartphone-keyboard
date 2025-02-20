import { ColorTheme } from "@shared/schema";

export const sampleThemes = [
  {
    name: "Classic Dark",
    colors: {
      background: "#2D2D2D",
      text: "#FFFFFF",
      keys: "#3D3D3D",
      accent: "#007AFF"
    }
  },
  {
    name: "Light Minimal",
    colors: {
      background: "#F5F5F5",
      text: "#000000",
      keys: "#FFFFFF",
      accent: "#FF3B30"
    }
  },
  {
    name: "Ocean",
    colors: {
      background: "#1B3B6F",
      text: "#FFFFFF",
      keys: "#204B8F",
      accent: "#7BD3EA"
    }
  },
  // ... Add more sample themes to make 10 total
] as const;

export function getTimeBasedTheme(): ColorTheme {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return {
      background: "#FFE5B4",
      text: "#4A4A4A",
      keys: "#FFF4E3",
      accent: "#FF9933"
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      background: "#87CEEB",
      text: "#2D2D2D",
      keys: "#B0E2FF",
      accent: "#4682B4"
    };
  } else if (hour >= 17 && hour < 20) {
    return {
      background: "#FF7F50",
      text: "#FFFFFF",
      keys: "#FFA07A",
      accent: "#FF4500"
    };
  } else {
    return {
      background: "#2C3E50",
      text: "#ECF0F1",
      keys: "#34495E",
      accent: "#3498DB"
    };
  }
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ColorModifier, HSLColor } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomColorHSL(): HSLColor {
  return [Math.floor(Math.random() * 360), 50, 50];
}

export function calculateMinimumRequiredMoves(
  sourceHsl: HSLColor,
  targetHsl: HSLColor
): number {
  const hueDiff = Math.abs(sourceHsl[0] - targetHsl[0]);
  const lightnessDiff = Math.abs(sourceHsl[2] - targetHsl[2]);
  const saturationDiff = Math.abs(sourceHsl[1] - targetHsl[1]);

  let moves = 0;

  if (hueDiff > 0) moves += Math.ceil(hueDiff / 30); // Approximate how many 30-degree moves to close the hue gap
  if (lightnessDiff > 0) moves += Math.ceil(lightnessDiff / 20); // Approximate how many 20% changes to lightness
  if (saturationDiff > 0) moves += Math.ceil(saturationDiff / 20); // Approximate how many 20% changes to saturation

  return moves;
}

export function hslToString(hsl: HSLColor): string {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

export const ColorModifications: Record<
  string,
  {
    label: string;
    modifier: ColorModifier;
  }
> = {
  complement: {
    label: "Complement",
    modifier: (hsl: HSLColor) => {
      return [(hsl[0] + 180) % 360, hsl[1], hsl[2]];
    },
  },
  triadic: {
    label: "Triadic",
    modifier: (hsl: HSLColor) => {
      return [(hsl[0] + 120) % 360, hsl[1], hsl[2]];
    },
  },
  monochromatic: {
    label: "Monochromatic",
    modifier: (hsl: HSLColor) => {
      const newLightness = Math.min(Math.max(hsl[2] + 20, 0), 100);
      return [hsl[0], hsl[1], newLightness];
    },
  },
  analogous: {
    label: "Analogous",
    modifier: (hsl: HSLColor) => {
      return [(hsl[0] + 30) % 360, hsl[1], hsl[2]];
    },
  },
  splitComplement: {
    label: "Split Complement",
    modifier: (hsl: HSLColor) => {
      return [(hsl[0] + 150) % 360, hsl[1], hsl[2]];
    },
  },
  tetradic: {
    label: "Tetradic (90°)",
    modifier: (hsl: HSLColor) => {
      return [(hsl[0] + 90) % 360, hsl[1], hsl[2]];
    },
  },
};

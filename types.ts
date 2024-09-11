export type HSLColor = [number, number, number];
export type ColorModifier = (hsl: HSLColor) => HSLColor;
export type GameState = "won" | "lost" | "playing";

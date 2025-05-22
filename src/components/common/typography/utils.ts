import type { ColorVariant, FontWeight, TextAlign } from "./types";

export const getColorStyles = (color?: ColorVariant) => {
  switch (color) {
    case "primary":
      return "color: var(--color-text-primary);";
    case "secondary":
      return "color: var(--color-text-secondary);";
    case "disabled":
      return "color: var(--color-text-disabled);";
    case "success":
      return "color: var(--color-success);";
    case "warning":
      return "color: var(--color-warning);";
    case "error":
      return "color: var(--color-error);";
    default:
      return "";
  }
};

export const getFontWeightStyles = (fontWeight?: FontWeight) => {
  switch (fontWeight) {
    case "regular":
      return "font-weight: var(--font-weight-regular);";
    case "medium":
      return "font-weight: var(--font-weight-medium);";
    case "semibold":
      return "font-weight: var(--font-weight-semibold);";
    case "bold":
      return "font-weight: var(--font-weight-bold);";
    default:
      return "";
  }
};

export const getTextAlignStyles = (align?: TextAlign) => {
  if (align) {
    return `text-align: ${align};`;
  }
  return "";
};

export const getMarginStyles = (noMargin?: boolean) => {
  return noMargin ? "margin: 0;" : "";
};

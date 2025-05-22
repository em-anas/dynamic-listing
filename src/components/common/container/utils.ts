import type { ContainerProps } from "./types";

export const getMaxWidth = (maxWidth: ContainerProps["maxWidth"]) => {
  switch (maxWidth) {
    case "sm":
      return "var(--breakpoint-sm)";
    case "md":
      return "var(--breakpoint-md)";
    case "lg":
      return "var(--breakpoint-lg)";
    case "xl":
      return "var(--breakpoint-xl)";
    case "xxl":
      return "var(--breakpoint-xxl)";
    case "full":
      return "100%";
    default:
      return typeof maxWidth === "string" ? maxWidth : "var(--breakpoint-lg)";
  }
};

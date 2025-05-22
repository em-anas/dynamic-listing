export type TextVariant = "body" | "caption" | "overline" | "label";
export type TitleVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type ColorVariant =
  | "primary"
  | "secondary"
  | "disabled"
  | "success"
  | "warning"
  | "error";
export type FontWeight = "regular" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right" | "justify";

export interface TypographyBaseProps {
  customColor?: ColorVariant;
  align?: TextAlign;
  noMargin?: boolean;
  fontWeight?: FontWeight;
}

export interface TextProps extends TypographyBaseProps {
  variant?: TextVariant;
  ellipsis?: boolean | { rows?: number };
  children?: React.ReactNode;
  className?: string;
}

export interface TitleProps extends TypographyBaseProps {
  variant?: TitleVariant;
  children?: React.ReactNode;
  className?: string;
}

export interface ParagraphProps extends TypographyBaseProps {
  spacing?: "sm" | "md" | "lg" | "none";
  children?: React.ReactNode;
  className?: string;
}

export interface LinkProps extends TextProps {
  underline?: boolean;
  href?: string;
}

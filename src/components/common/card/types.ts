import type { CardProps as AntCardProps } from "antd";

export interface CardProps extends AntCardProps {
  elevation?: "none" | "low" | "medium" | "high";
  noPadding?: boolean;
  borderless?: boolean;
}

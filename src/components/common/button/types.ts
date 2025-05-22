import type { ButtonProps as AntButtonProps } from "antd";

export interface ButtonProps extends Omit<AntButtonProps, "type" | "variant"> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "text"
    | "success"
    | "warning"
    | "error";
  fullWidth?: boolean;
}

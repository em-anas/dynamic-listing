import type { FormItemProps, SelectProps } from "antd";

export type SearchInputProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
  allowClear?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
};

export type SortValue = "asc" | "desc";

export type SortControlsProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
  label?: string;
  className?: string;
  width?: number | string;
};

export interface FormSelectProps extends Omit<FormItemProps, "children"> {
  options: Array<{
    label: string;
    value: string | number;
    disabled?: boolean;
  }>;
  selectProps?: SelectProps;
  placeholder?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  notFoundContent?: React.ReactNode;
}

import { Form, Select } from "antd";
import type { FormSelectProps } from "./types";

export const FormSelect: React.FC<FormSelectProps> = ({
  options,
  selectProps,
  placeholder = "Select option",
  showSearch = false,
  allowClear = false,
  disabled = false,
  notFoundContent = "No options found",
  ...formItemProps
}) => {
  return (
    <Form.Item {...formItemProps}>
      <Select
        placeholder={placeholder}
        showSearch={showSearch}
        allowClear={allowClear}
        disabled={disabled}
        notFoundContent={notFoundContent}
        style={{ width: "100%" }}
        {...selectProps}
      >
        {options.map((option) => (
          <Select.Option
            key={option.value.toString()}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

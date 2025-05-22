import React from "react";
import { Select } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Text } from "../typography/Typography";
import type { SortControlsProps } from "./types";
import { OptionContent, SortContainer } from "./styles";

const { Option } = Select;

export const SortControls: React.FC<SortControlsProps> = ({
  value,
  onChange,
  label = "Sort",
  className,
  width = 150,
}) => {
  
  const handleChange = (val: unknown) => {
    if (val === "asc" || val === "desc") {
      onChange(val);
    }
  };

  const selectWidth = typeof width === "number" ? `${width}px` : width;

  return (
    <SortContainer className={className}>
      {label && <Text variant="label">{label}:</Text>}
      <Select
        value={value}
        onChange={handleChange}
        style={{ width: selectWidth }}
        className="sort-select"
      >
        <Option value="asc">
          <OptionContent>
            <SortAscendingOutlined />A to Z
          </OptionContent>
        </Option>
        <Option value="desc">
          <OptionContent>
            <SortDescendingOutlined />Z to A
          </OptionContent>
        </Option>
      </Select>
    </SortContainer>
  );
};

export default SortControls;

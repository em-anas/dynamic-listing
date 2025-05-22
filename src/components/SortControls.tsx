import React from "react";
import { Select, Typography } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

interface SortControlsProps {
  value: "asc" | "desc";
  onChange: (value: "asc" | "desc") => void;
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const SortControls: React.FC<SortControlsProps> = ({
  value,
  onChange,
  label = "Sort",
  style,
  className,
}) => {
  return (
    <div className={`sort-controls ${className || ""}`} style={style}>
      {label && <Text style={{ marginRight: 8 }}>{label}:</Text>}
      <Select value={value} onChange={onChange} style={{ width: 150 }}>
        <Option value="asc">
          <div style={{ display: "flex", alignItems: "center" }}>
            <SortAscendingOutlined style={{ marginRight: 8 }} />A to Z
          </div>
        </Option>
        <Option value="desc">
          <div style={{ display: "flex", alignItems: "center" }}>
            <SortDescendingOutlined style={{ marginRight: 8 }} />Z to A
          </div>
        </Option>
      </Select>
    </div>
  );
};

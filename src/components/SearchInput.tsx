import React, { useState, useCallback, useEffect } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "../hooks";

interface SearchInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value = "",
  onChange,
  placeholder = "Search",
  delay = 300,
  allowClear = true,
  className,
  style,
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const debouncedValue = useDebounce(searchValue, delay);

  // Update parent on debounced value change
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  // Update search value on input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  // Clear search value
  const handleClear = useCallback(() => {
    setSearchValue("");
  }, []);

  return (
    <Input
      value={searchValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      allowClear={allowClear}
      onPressEnter={() => onChange(searchValue)}
      className={`search-input ${className || ""}`}
      style={style}
      onClear={handleClear}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

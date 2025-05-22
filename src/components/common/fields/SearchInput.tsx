import React, { useState, useCallback, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "../../../hooks";
import type { SearchInputProps } from "./types";
import { StyledInput } from "./styles";

export const SearchInput: React.FC<SearchInputProps> = ({
  value = "",
  onChange,
  placeholder = "Search",
  delay = 300,
  allowClear = true,
  className,
  size = "medium",
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const debouncedValue = useDebounce(searchValue, delay);

  
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  
  const handleClear = useCallback(() => {
    setSearchValue("");
  }, []);

  return (
    <StyledInput
      value={searchValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      allowClear={allowClear}
      onPressEnter={() => onChange(searchValue)}
      className={`search-input ${className || ""}`}
      onClear={handleClear}
      onClick={(e) => e.stopPropagation()}
      inputSize={size}
    />
  );
};

export default SearchInput;

import { Input } from "antd";
import styled from "styled-components";
import type { SearchInputProps } from "./types";

export const StyledInput = styled(Input)<{
  inputSize?: SearchInputProps["size"];
}>`
  width: 100%;
  border-radius: var(--border-radius-md);
  border-color: var(--color-border);
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--color-hover-primary);
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-focus-primary);
  }

  ${({ inputSize }) => {
    switch (inputSize) {
      case "small":
        return `
          height: 32px;
          padding: var(--spacing-xs) var(--spacing-sm);
          font-size: var(--font-size-xs);
        `;
      case "large":
        return `
          height: 48px;
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: var(--font-size-lg);
        `;
      case "medium":
      default:
        return `
          height: 40px;
          padding: var(--spacing-sm) var(--spacing-md);
          font-size: var(--font-size-md);
        `;
    }
  }}
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  .sort-select {
    .ant-select-selector {
      border-radius: var(--border-radius-md);
      border-color: var(--color-border);
      transition: all var(--transition-normal);
    }

    &:hover .ant-select-selector {
      border-color: var(--color-hover-primary);
    }

    &.ant-select-focused .ant-select-selector {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-focus-primary);
    }
  }
`;

export const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

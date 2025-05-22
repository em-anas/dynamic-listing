import { Button } from "antd";
import styled from "styled-components";
import type { ButtonProps } from "./types";

export const StyledButton = styled(Button)<ButtonProps>`
  &.ant-btn {
    border-radius: var(--border-radius-md);
    font-weight: var(--font-weight-medium);
    transition: all var(--transition-normal);
    height: auto;
    padding: var(--spacing-sm) var(--spacing-md);

    ${({ fullWidth }) => fullWidth && "width: 100%;"}

    ${({ variant }) => {
      switch (variant) {
        case "secondary":
          return `
            background-color: var(--color-background-secondary);
            border-color: var(--color-border);
            color: var(--color-text-primary);
            
            &:hover {
              background-color: var(--color-background-tertiary);
              border-color: var(--color-hover-primary);
              color: var(--color-hover-primary);
            }
            
            &:active {
              background-color: var(--color-background-tertiary);
              border-color: var(--color-active-primary);
              color: var(--color-active-primary);
            }
          `;
        case "outline":
          return `
            background-color: transparent;
            border-color: var(--color-primary);
            color: var(--color-primary);
            
            &:hover {
              background-color: var(--color-focus-primary);
              color: var(--color-hover-primary);
              border-color: var(--color-hover-primary);
            }
          `;
        case "text":
          return `
            background-color: transparent;
            border-color: transparent;
            color: var(--color-primary);
            box-shadow: none;
            
            &:hover {
              background-color: var(--color-focus-primary);
              color: var(--color-hover-primary);
            }
          `;
        case "success":
          return `
            background-color: var(--color-success);
            border-color: var(--color-success);
            color: white;
            
            &:hover {
              background-color: var(--color-hover-secondary);
              border-color: var(--color-hover-secondary);
            }
          `;
        case "warning":
          return `
            background-color: var(--color-warning);
            border-color: var(--color-warning);
            color: white;
          `;
        case "error":
          return `
            background-color: var(--color-error);
            border-color: var(--color-error);
            color: white;
          `;
        case "primary":
        default:
          return `
            background-color: var(--color-primary);
            border-color: var(--color-primary);
            color: white;
            
            &:hover {
              background-color: var(--color-hover-primary);
              border-color: var(--color-hover-primary);
            }
            
            &:active {
              background-color: var(--color-active-primary);
              border-color: var(--color-active-primary);
            }
          `;
      }
    }}
  }
`;

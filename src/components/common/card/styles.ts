import { Card } from "antd";
import styled from "styled-components";
import type { CardProps } from "./types";

export const StyledCard = styled(Card)<CardProps>`
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-normal);
  overflow: hidden;

  ${({ borderless }) =>
    borderless &&
    `
    border: none;
  `}

  ${({ noPadding }) =>
    noPadding &&
    `
    .ant-card-body {
      padding: 0;
    }
  `}
  
  &:hover {
    box-shadow: ${({ elevation }) =>
      elevation === "none"
        ? "none"
        : elevation === "low"
        ? "var(--shadow-md)"
        : elevation === "medium"
        ? "var(--shadow-lg)"
        : "var(--shadow-xl)"};
  }

  .ant-card-head {
    border-bottom: 1px solid var(--color-border);
    padding: var(--spacing-md) var(--spacing-lg);
    min-height: auto;

    .ant-card-head-title {
      padding: 0;
    }
  }

  .ant-card-body {
    padding: var(--spacing-lg);
  }

  .ant-card-actions {
    border-top: 1px solid var(--color-border);
    background-color: var(--color-background-secondary);
  }
`;

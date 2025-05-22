import styled, { css } from "styled-components";
import type {
  ParagraphProps,
  TextProps,
  TitleProps,
  TypographyBaseProps,
  LinkProps,
} from "./types";
import { Typography as AntTypography } from "antd";
import {
  getColorStyles,
  getFontWeightStyles,
  getMarginStyles,
  getTextAlignStyles,
} from "./utils";

const {
  Text: AntText,
  Title: AntTitle,
  Paragraph: AntParagraph,
  Link: AntLink,
} = AntTypography;

const baseStyles = css<TypographyBaseProps>`
  ${({ customColor }) => getColorStyles(customColor)}
  ${({ fontWeight }) => getFontWeightStyles(fontWeight)}
  ${({ align }) => getTextAlignStyles(align)}
  ${({ noMargin }) => getMarginStyles(noMargin)}
`;

export const StyledText = styled(AntText)<TextProps>`
  ${baseStyles}

  ${({ variant }) => {
    switch (variant) {
      case "caption":
        return `
          font-size: var(--font-size-xs);
          line-height: var(--line-height-tight);
        `;
      case "overline":
        return `
          font-size: var(--font-size-xs);
          line-height: var(--line-height-tight);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        `;
      case "label":
        return `
          font-size: var(--font-size-sm);
          line-height: var(--line-height-normal);
          font-weight: var(--font-weight-medium);
        `;
      case "body":
      default:
        return `
          font-size: var(--font-size-md);
          line-height: var(--line-height-normal);
        `;
    }
  }}
`;

export const StyledTitle = styled(AntTitle)<TitleProps>`
  ${baseStyles}

  &.ant-typography {
    ${({ variant }) => {
      switch (variant) {
        case "h1":
          return `
            font-size: var(--font-size-xxl);
            line-height: var(--line-height-tight);
            font-weight: var(--font-weight-bold);
          `;
        case "h2":
          return `
            font-size: var(--font-size-xl);
            line-height: var(--line-height-tight);
            font-weight: var(--font-weight-semibold);
          `;
        case "h3":
          return `
            font-size: var(--font-size-lg);
            line-height: var(--line-height-tight);
            font-weight: var(--font-weight-semibold);
          `;
        case "h4":
          return `
            font-size: var(--font-size-md);
            line-height: var(--line-height-tight);
            font-weight: var(--font-weight-semibold);
          `;
        case "h5":
          return `
            font-size: var(--font-size-sm);
            line-height: var(--line-height-tight);
            font-weight: var(--font-weight-semibold);
          `;
        case "h6":
          return `
            font-size: var(--font-size-xs);
            line-height: var(--line-height-tight);
            font-weight: var(--font-weight-semibold);
          `;
        default:
          return "";
      }
    }}
  }
`;

export const StyledParagraph = styled(AntParagraph)<ParagraphProps>`
  ${baseStyles}

  &.ant-typography {
    font-size: var(--font-size-md);
    line-height: var(--line-height-relaxed);

    ${({ spacing }) => {
      switch (spacing) {
        case "sm":
          return "margin-bottom: var(--spacing-sm);";
        case "md":
          return "margin-bottom: var(--spacing-md);";
        case "lg":
          return "margin-bottom: var(--spacing-lg);";
        case "none":
          return "margin-bottom: 0;";
        default:
          return "margin-bottom: var(--spacing-md);";
      }
    }}
  }
`;

export const StyledLink = styled(AntLink)<LinkProps>`
  ${baseStyles}

  &.ant-typography {
    ${({ underline }) => (underline === false ? "text-decoration: none;" : "")}
    color: var(--color-primary);
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-hover-primary);
    }

    &:active {
      color: var(--color-active-primary);
    }
  }
`;

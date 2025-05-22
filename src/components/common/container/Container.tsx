import styled from "styled-components";
import type { ContainerProps } from "./types";
import { getMaxWidth } from "./utils";

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${({ maxWidth = "lg" }) => getMaxWidth(maxWidth)};
  margin: ${({ margin = "0 auto" }) => margin};
  padding: ${({ padding = "var(--spacing-md)" }) => padding};
  box-sizing: border-box;

  ${({ centerContent }) =>
    centerContent &&
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}

  ${({ textAlign }) =>
    textAlign &&
    `
    text-align: ${textAlign};
  `}
  
  ${({ responsive }) =>
    responsive &&
    `
    @media (max-width: var(--breakpoint-sm)) {
      padding: var(--spacing-sm);
    }
  `}
`;

export const PageContainer = styled(Container)`
  padding: var(--spacing-lg) var(--spacing-md);

  @media (max-width: var(--breakpoint-sm)) {
    padding: var(--spacing-md) var(--spacing-sm);
  }
`;

export const SectionContainer = styled(Container)`
  margin-bottom: var(--spacing-xl);
`;

import styled from "styled-components";

export const SpinnerContainer = styled.div<{ fullScreen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);

  ${({ fullScreen }) =>
    fullScreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: var(--z-index-modal);
  `}

  .ant-spin {
    .ant-spin-text {
      margin-top: var(--spacing-sm);
      color: var(--color-primary);
    }
  }
`;

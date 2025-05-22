import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const { Content, Footer: AntFooter, Header: AntHeader } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledContent = styled(Content)`
  padding: var(--spacing-lg) 0;
`;

export const StyledFooter = styled(AntFooter)`
  text-align: center;
  background-color: var(--color-background-secondary);
  padding: var(--spacing-lg) var(--spacing-md);
`;

export const StyledHeader = styled(AntHeader)`
  background-color: var(--color-text-disabled);
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: auto;
  line-height: 1.5;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);

  @media (max-width: var(--breakpoint-sm)) {
    padding: var(--spacing-sm);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: var(--spacing-lg);

  @media (max-width: var(--breakpoint-sm)) {
    margin-right: 0;
    width: 100%;
    justify-content: center;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;

  h3 {
    color: white;
    margin: 0;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const StyledMenu = styled(Menu)`
  flex: 1;
  border-bottom: none;
  display: flex;
  justify-content: flex-end;
  background-color: var(--color-transparent);

  @media (max-width: var(--breakpoint-sm)) {
    width: 100%;
    justify-content: center;

    .ant-menu-item {
      margin: 0 var(--spacing-xs);
    }
  }
`;

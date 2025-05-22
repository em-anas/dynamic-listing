import React from "react";
import { useLocation } from "react-router-dom";
import { Title } from "../common";
import { LogoContainer, StyledHeader, StyledLink, StyledMenu } from "./styles";

export const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1] || "/";

  return (
    <StyledHeader>
      <LogoContainer>
        <StyledLink to="/">
          <Title noMargin variant="h2">
            Mobile Dashboard
          </Title>
        </StyledLink>
      </LogoContainer>
      <StyledMenu
        mode="horizontal"
        selectedKeys={[currentPath === "/" ? "/" : `/${currentPath}`]}
        items={[
          {
            key: "/",
            label: (
              <StyledLink to="/">
                <Title variant="h4">Brands</Title>
              </StyledLink>
            ),
          },
          {
            key: "/mobiles",
            label: (
              <StyledLink to="/mobiles">
                <Title variant="h4">Devices</Title>
              </StyledLink>
            ),
          },
        ]}
      />
    </StyledHeader>
  );
};

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Title } from "../common";
import { LogoContainer, StyledHeader, StyledLink, StyledMenu } from "./styles";

export const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1] || "/";

  return (
    <StyledHeader>
      <LogoContainer>
        <StyledLink to="/">
          <Title noMargin variant="h3" customColor="disabled">
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
              <Link to="/">
                <Title variant="h4">Brands</Title>
              </Link>
            ),
          },
          {
            key: "/mobiles",
            label: (
              <Link to="/mobiles">
                <Title variant="h4">Devices</Title>
              </Link>
            ),
          },
        ]}
      />
    </StyledHeader>
  );
};

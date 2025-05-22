import React from "react";

import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { StyledContent, StyledFooter, StyledLayout } from "./styles";

export const MainLayout: React.FC = () => {
  return (
    <StyledLayout>
      <Header />
      <StyledContent>
        <Outlet />
      </StyledContent>
      <StyledFooter>Mobile Dashboard © {new Date().getFullYear()}</StyledFooter>
    </StyledLayout>
  );
};

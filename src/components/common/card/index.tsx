import React from "react";
import type { CardProps } from "./types";
import { StyledCard } from "./styles";

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default Card;

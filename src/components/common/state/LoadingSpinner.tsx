import React from "react";
import { Spin } from "antd";
import { SpinnerContainer } from "./styles";
import type { LoadingSpinnerProps } from "./types";

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  tip = "Loading...",
  size = "large",
  fullScreen = false,
  className,
}) => {
  return (
    <SpinnerContainer fullScreen={fullScreen} className={className}>
      <Spin size={size} tip={tip} />
    </SpinnerContainer>
  );
};

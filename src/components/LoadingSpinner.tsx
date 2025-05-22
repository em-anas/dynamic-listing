import React from "react";
import { Spin } from "antd";

interface LoadingSpinnerProps {
  tip?: string;
  size?: "small" | "default" | "large";
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  tip = "Loading...",
  size = "large",
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <div className="full-screen-spinner">
        <Spin size={size} tip={tip} />
      </div>
    );
  }

  return <Spin size={size} tip={tip} />;
};

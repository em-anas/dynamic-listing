import { StyledButton } from "./styles";
import type { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const getAntdType = () => {
    switch (props.variant) {
      case "primary":
        return "primary";
      case "text":
        return "text";
      case "outline":
        return "default";
      case "success":
      case "warning":
      case "error":
      case "secondary":
      default:
        return "default";
    }
  };

  return (
    <StyledButton type={getAntdType()} {...props}>
      {children}
    </StyledButton>
  );
};

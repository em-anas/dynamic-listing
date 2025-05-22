import { StyledLink, StyledParagraph, StyledText, StyledTitle } from "./styles";
import type { LinkProps, ParagraphProps, TextProps, TitleProps } from "./types";

export const Text: React.FC<TextProps> = ({
  children,
  customColor,
  ...props
}) => {
  return (
    <StyledText customColor={customColor} {...props}>
      {children}
    </StyledText>
  );
};

export const Title: React.FC<TitleProps> = ({
  children,
  variant,
  customColor,
  ...props
}) => {
  const getLevel = () => {
    switch (variant) {
      case "h1":
        return 1;
      case "h2":
        return 2;
      case "h3":
        return 3;
      case "h4":
        return 4;
      case "h5":
        return 5;
      case "h6":
        return 5;
      default:
        return undefined;
    }
  };

  return (
    <StyledTitle
      level={getLevel()}
      variant={variant}
      customColor={customColor}
      {...props}
    >
      {children}
    </StyledTitle>
  );
};

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  customColor,
  ...props
}) => {
  return (
    <StyledParagraph customColor={customColor} {...props}>
      {children}
    </StyledParagraph>
  );
};

export const Link: React.FC<LinkProps> = ({
  children,
  customColor,
  ...props
}) => {
  return (
    <StyledLink customColor={customColor} {...props}>
      {children}
    </StyledLink>
  );
};

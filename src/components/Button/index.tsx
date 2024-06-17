import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";
import { StyledButton, ButtonContentWrapper } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  vanilla?: boolean;
  children: string | ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  vanilla = true,
  children,
  ...rest
}) => {
  return (
    <StyledButton vanilla={vanilla} {...rest}>
      <ButtonContentWrapper>{children}</ButtonContentWrapper>
    </StyledButton>
  );
};

export default Button;

import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import StyledButton from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  vanilla: boolean;
  children: string;
}

const Button: FunctionComponent<ButtonProps> = ({
  vanilla = false,
  children,
  ...rest
}) => {
  return (
    <StyledButton vanilla={vanilla} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;

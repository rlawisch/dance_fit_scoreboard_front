import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";
import StyledButton from "./styles";

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
      {children}
    </StyledButton>
  );
};

export default Button;

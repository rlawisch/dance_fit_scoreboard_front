import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";
import { StyledButton } from "./styles";

interface UpdateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  vanilla?: boolean;
  children: string | ReactNode;
}

const UpdateButton: FunctionComponent<UpdateButtonProps> = ({
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

export default UpdateButton;

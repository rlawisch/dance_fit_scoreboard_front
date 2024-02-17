import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";
import { StyledButton } from "./styles";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  vanilla?: boolean;
  children: string | ReactNode;
}

const DeleteButton: FunctionComponent<DeleteButtonProps> = ({
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

export default DeleteButton;

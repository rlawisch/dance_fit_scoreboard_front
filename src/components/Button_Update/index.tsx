import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";
import { StyledButton } from "./styles";
import { ButtonContentWrapper } from "../Button/styles";

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
      <ButtonContentWrapper>{children}</ButtonContentWrapper>
    </StyledButton>
  );
};

export default UpdateButton;

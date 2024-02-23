import { FunctionComponent, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { ErrorMessage, Label, StyledInput } from "./styles";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconType;
  register: UseFormRegister<any>;
  name: string;
  error: string | undefined;
  label?: string;
}

const Input: FunctionComponent<InputProps> = ({
  icon: Icon,
  register,
  name,
  error = "",
  label,
  ...rest
}) => {
  return (
    <StyledInput>
      {label && <Label>{label}</Label>}
      <div>
        {Icon && <Icon />}
        <input {...register(name)} {...rest} />
      </div>
      <ErrorMessage>{error}</ErrorMessage>
    </StyledInput>
  );
};

export default Input;

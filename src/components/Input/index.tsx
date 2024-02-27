import { FunctionComponent, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { ErrorMessage, Label, StyledInput } from "./styles";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconType;
  register?: UseFormRegister<any>; // Making register prop optional
  name?: string; // Making name prop optional
  error?: string | undefined; // Making error prop optional
  label?: string;
}

const Input: FunctionComponent<InputProps> = ({
  icon: Icon,
  register,
  name,
  error,
  label,
  ...rest
}) => {
  return (
    <StyledInput>
      {label && <Label>{label}</Label>}
      <div>
        {Icon && <Icon />}
        {register && name ? ( // Check if register and name are provided
          <input {...register(name)} {...rest} /> // Only include register if it's provided
        ) : (
          <input {...rest} />
        )}
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </StyledInput>
  );
};

export default Input;

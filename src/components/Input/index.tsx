import { FunctionComponent, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { ErrorMessage, StyledInput } from "./styles";
import { UseFormRegister } from "react-hook-form";

// tech debt typing register function:
// import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconType;
  register: UseFormRegister<any>;
  name: string;
  error: string | undefined;
}

const Input: FunctionComponent<InputProps> = ({
  icon: Icon,
  register,
  name,
  error = "",
  ...rest
}) => {
  return (
    <StyledInput>
      <div>
        {Icon && <Icon />}
        <input {...register(name)} {...rest} />
      </div>
      <ErrorMessage>{error}</ErrorMessage>
    </StyledInput>
  );
};

export default Input;

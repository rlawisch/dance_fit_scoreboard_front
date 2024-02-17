import { FunctionComponent } from "react";
import { UseFormRegister } from "react-hook-form";
import { SelectWrapper } from "./styles";

interface SelectProps {
  options: { label: string; value: string }[];
  register: UseFormRegister<any>;
  placeholder?: string;
}

const Select: FunctionComponent<SelectProps> = ({
  options,
  register,
  placeholder,
  ...rest
}) => {
  return (
    <SelectWrapper {...register} {...rest}>
      {placeholder && (
        <option value="" disabled selected>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectWrapper>
  );
};

export default Select;

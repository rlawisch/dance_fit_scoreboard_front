import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { GlobalContainer } from "../../styles/global";
import { FormContainer } from "./styles";
import Input from "../../components/Input";
import { AiOutlineUser } from "react-icons/ai";
import { PiPassword } from "react-icons/pi";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { usePlayer } from "../../providers/Players";
import { ISignup } from "../../providers/Players";

const SignUp = () => {
  const formSchema = yup.object<ISignup>().shape({
    nickname: yup.string().required("Preencha este campo"),
    password: yup.string().required("Preencha este campo"),
    confirmPassword: yup
      .string()
      .required("Preencha este campo")
      .oneOf([yup.ref("password"), ""], "Senhas devem iguais"),
  });

  const { playerSignup } = usePlayer();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>({
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit = (formData: ISignup) => {
    playerSignup(formData);
  };

  return (
    <GlobalContainer>
      <FormContainer>
        <h1>Cadastro</h1>

        <form id="login_form" onSubmit={handleSubmit(onFormSubmit)}>
          <Input
            icon={AiOutlineUser}
            name="nickname"
            register={register}
            error={errors.nickname?.message}
          />

          <Input
            icon={PiPassword}
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />

          <Input
            icon={PiPassword}
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword?.message}
          />
        </form>

        <Button vanilla={true} type="submit" form="login_form">
          Cadastro
        </Button>

        <Link to="/login">
          <Button vanilla={false}>Login</Button>
        </Link>
      </FormContainer>
    </GlobalContainer>
  );
};

export default SignUp;

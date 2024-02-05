import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { GlobalContainer } from "../../styles/global";
import { FormContainer } from "./signup.style";
import Input from "../../components/Input";
import { AiOutlineUser } from "react-icons/ai";
import { PiPassword } from "react-icons/pi";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

interface signupCredentials {
  nickname: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const formSchema = yup.object<signupCredentials>().shape({
    nickname: yup.string().required("Preencha este campo"),
    password: yup.string().required("Preencha este campo"),
    confirmPassword: yup
      .string()
      .required("Preencha este campo")
      .oneOf([yup.ref("password"), ""], "Senhas devem iguais"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupCredentials>({
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit = ({
    nickname,
    password,
    confirmPassword,
  }: signupCredentials) => {
    console.log({ nickname, password, confirmPassword });
  };

  return (
    <GlobalContainer>
      <FormContainer>
        <h1>Cadastro</h1>

        <form id="login_form" onSubmit={handleSubmit(onFormSubmit)}>
          <Input
            icon={AiOutlineUser}
            name="username"
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

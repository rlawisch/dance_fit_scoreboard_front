import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { GlobalContainer } from "../../styles/global";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineUser } from "react-icons/ai";
import { PiPassword } from "react-icons/pi";
import Button from "../../components/Button";
import { FormContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../providers/Players";
import { ILogin } from "../../types/form-types";

const Login = () => {
  const formSchema = yup.object<ILogin>().shape({
    nickname: yup.string().required("Preencha este campo"),
    password: yup.string().required("Preencha este campo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();

  const { playerLogin } = usePlayer();

  const onFormSubmit = (formData: ILogin) => {
    playerLogin(formData);
  };

  return (
    <GlobalContainer>
      <Button onClick={() => navigate(`/public/events`)}>
        Entrar como Visitante
      </Button>
      <FormContainer>
        <h1>Login</h1>

        <form id="login_form" onSubmit={handleSubmit(onFormSubmit)}>
          <Input
            label="Nickname"
            icon={AiOutlineUser}
            name="nickname"
            register={register}
            error={errors.nickname?.message}
          />

          <Input
            label="Senha"
            icon={PiPassword}
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
        </form>

        <Button vanilla={true} type="submit" form="login_form">
          Login
        </Button>

      </FormContainer>
    </GlobalContainer>
  );
};

export default Login;

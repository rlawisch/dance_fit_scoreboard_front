import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import {
  CustomHr,
  CustomHrContainer,
  FormWrapper,
  GlobalContainer,
  Title,
} from "../../styles/global";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineUser } from "react-icons/ai";
import { PiPassword } from "react-icons/pi";
import Button from "../../components/Button";
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
      <FormWrapper onSubmit={handleSubmit(onFormSubmit)}>
        <Button
          onClick={() => navigate(`/udashboard/home`)}
          style={{ margin: `16px` }}
        >
          Entrar como Visitante
        </Button>
        <Title>Login</Title>

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

        <Button vanilla={true} type="submit">
          Login
        </Button>

        <CustomHrContainer>
          <CustomHr />
          <p>ou</p>
          <CustomHr />
        </CustomHrContainer>

        <Button
          type="button"
          vanilla={false}
          onClick={() => navigate(`/signup`)}
          style={{ margin: `0 0 24px 0` }}
        >
          Cadastro
        </Button>
      </FormWrapper>
    </GlobalContainer>
  );
};

export default Login;

import { FunctionComponent } from "react";
import {
  FormWrapper,
  GlobalContainer,
  Title,
} from "../../styles/global";
import { usePlayer } from "../../providers/Players";
import { ISignup } from "../../types/form-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import { AiOutlineUser } from "react-icons/ai";
import { PiPassword } from "react-icons/pi";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

interface SignupProps {}

const Signup: FunctionComponent<SignupProps> = () => {
  const navigate = useNavigate();

  const { publicPlayerSignUp } = usePlayer();

  const formSchema = yup.object<ISignup>().shape({
    nickname: yup.string().required("Preencha este campo"),
    password: yup.string().required("Preencha este campo"),
    confirmPassword: yup
      .string()
      .required("Preencha este campo")
      .oneOf([yup.ref("password"), ""], "Senhas devem iguais"),
  });

  const {
    register: registerCreatePlayer,
    handleSubmit: handleSubmitCreatePlayer,
    formState: { errors: createPlayerErrors },
  } = useForm<ISignup>({
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit = (formData: ISignup) => {
    publicPlayerSignUp(formData);
  };

  return (
    <GlobalContainer>
      <Button onClick={() => navigate(`/public/events`)}>
        Entrar como Visitante
      </Button>

      <Title>Cadastro</Title>

      <FormWrapper onSubmit={handleSubmitCreatePlayer(onFormSubmit)}>
        <Input
          label="Nickname"
          icon={AiOutlineUser}
          name="nickname"
          register={registerCreatePlayer}
          error={createPlayerErrors.nickname?.message}
        />

        <Input
          label="Senha"
          icon={PiPassword}
          name="password"
          type="password"
          register={registerCreatePlayer}
          error={createPlayerErrors.password?.message}
        />

        <Input
          label="Confirmar Senha"
          icon={PiPassword}
          name="confirmPassword"
          type="password"
          register={registerCreatePlayer}
          error={createPlayerErrors.confirmPassword?.message}
        />

        <Button type="submit">Cadastro</Button>

        <Button vanilla={false} onClick={() => navigate(`/login`)}>
          Login
        </Button>
      </FormWrapper>
    </GlobalContainer>
  );
};

export default Signup;

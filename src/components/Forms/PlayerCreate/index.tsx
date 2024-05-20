import { FunctionComponent } from "react";
import {
  ContentWrapper,
  FormWrapper,
  GlobalContainer,
} from "../../../styles/global";
import { usePlayer } from "../../../providers/Players";
import * as yup from "yup";
import { ISignup } from "../../../types/form-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineUser } from "react-icons/ai";
import { PiPassword } from "react-icons/pi";
import Button from "../../Button";
import Input from "../../Input";

interface PlayerCreateFormProps {}

const PlayerCreateForm: FunctionComponent<PlayerCreateFormProps> = () => {
  const { playerSignUp } = usePlayer();

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
    playerSignUp(formData);
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Cadastrar novo Jogador(a)</p>

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

          <Button vanilla={false} type="submit">
            Cadastro
          </Button>
        </FormWrapper>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default PlayerCreateForm;

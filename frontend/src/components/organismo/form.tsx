import { useForm } from "react-hook-form";
import { Input } from "../atomo/input";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        inputType="text"
        name="userName"
        defaultValue=""
        placeholderText="Nome de Usuário"
        requiredValue={true}
      />

      <Input
        name="passwordInput"
        inputType="password"
        requiredValue={true}
        placeholderText="Senha"
        defaultValue=""
      />

      <button type="submit">Enviar</button>
    </form>
  );
};

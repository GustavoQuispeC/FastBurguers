import { LoginErrorProps, LoginProps } from "../types";


export function validateLoginForm(values: LoginProps): LoginErrorProps {
  let errors: LoginErrorProps = {
    email: "",
    password: "",
  };

  if (!values.email.trim()) {
    errors.email = "El campo email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email es invalido";
  } else if (!values.password.trim()) {
    errors.password = "El campo password es requerido";
  }

  return errors;
}

import { RegisterErrorProps, RegisterProps } from "../types";

export function validateRegisterForm(
  values: RegisterProps
): RegisterErrorProps {
  let errors: RegisterErrorProps = {
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
  };

  if (!values.name.trim()) {
    errors.name = "El campo nombre es requerido";
  }

  if (!values.email.trim()) {
    errors.email = "El campo email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email es inválido";
  }

  if (!values.address.trim()) {
    errors.address = "El campo dirección es requerido";
  }

  if (!values.phone) {
    errors.phone = "El campo teléfono es requerido";
  } else if (values.phone.startsWith("0")) {
    errors.phone = "El número de teléfono no puede empezar con 0";
  }

  if (!values.password.trim()) {
    errors.password = "El campo password es requerido";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "El campo confirmación de contraseña es requerido";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  if (!values.country.trim()) {
    errors.country = "El campo país es requerido";
  }

  if (!values.city.trim()) {
    errors.city = "El campo ciudad es requerido";
  }

  return errors;
}

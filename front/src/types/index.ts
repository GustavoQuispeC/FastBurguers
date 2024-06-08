export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginTerceros {
  email: string;
}
export interface LoginErrorProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
}

export interface RegisterErrorProps {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
}

export interface userSession {
  userData: {
    message: string;
    token: string;
    data: {
      userid: string;
      name: string;
      email: string;
      address: string;
      phone: string;
      city: string;
      country: string;
    };
  };
}

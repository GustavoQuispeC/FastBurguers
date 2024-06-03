export interface LoginProps {
  email: string;
  password: string;
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
  token: string;
  userData: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: string;
    credential: {
      id: number;
      password: string;
    };
    orders: any[]; // Cambia el tipo según la estructura real de "orders"
  };
}

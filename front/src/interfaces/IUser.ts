export interface IUser {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  address: string;
  phone: number;
  country: string;
  city: string;
}

export interface IUserSession {
  data: IUser;
  message: string;
  token: string;
}

export interface IUserSessionLocal {
  userData: IUserSession;
}

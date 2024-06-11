export interface IUser {
  id:string
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: number;
  country: string;
  city: string;
  enable: boolean;
  role: string;
}
export interface IUserSession {
  userData: {
    data: IUser;
    message: string;
    token: string;
  };
}

export interface ILoginParams {
  username: string;
  password: string;
  company_id?: number;
}

export interface ForgorPasswordParams {
  email: string;
}

export interface ILoginValidation {
  username: string;
  password: string;
  factory?: any;
}

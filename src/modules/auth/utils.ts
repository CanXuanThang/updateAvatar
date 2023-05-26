import { ILoginParams, ILoginValidation } from '../../models/auth';
import { EmployeeParams, EmployeeValidate } from '../../models/employee';
import { ISignUpParams, ISignUpValidation } from '../../models/singup';

const validateEmail = (username: string) => {
  if (!username) {
    return 'usernameRequire';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};

const validateFactory = (factory: number) => {
  if (!factory) {
    return 'factoryRequire';
  }
  return '';
};

const validateRepeatPassword = (password: string, repeatPassword: string) => {
  if (!repeatPassword) {
    return 'passwordRequire';
  }

  if (password.length < 8 && password.length > 16) {
    return 'minPasswordInvalid';
  }

  if (password !== repeatPassword) {
    return 'matchPasswordInvalid';
  }

  return '';
};

const validateField = (field: string, value: string) => {
  if (value) return '';
  let fieldRequire = '';
  switch (field) {
    case 'name':
      fieldRequire = 'nameRequire';
      break;

    case 'gender':
      fieldRequire = 'genderRequire';
      break;

    case 'region':
      fieldRequire = 'regionRequire';
      break;

    case 'state':
      fieldRequire = 'stateRequire';
      break;
  }

  return fieldRequire;
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    username: validateEmail(values.username),
    password: validatePassword(values.password),
    factory: validateFactory(Number(values.company_id)),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.username && !values.password;
};

export const validateSignUp = (values: ISignUpParams): ISignUpValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),
    name: validateField('name', values.name),
    gender: validateField('gender', values.gender),
    region: validateField('region', values.region),
    state: validateField('state', values.state),
  };
};

export const validSignUp = (values: ISignUpValidation) => {
  return (
    !values.email &&
    !values.password &&
    !values.repeatPassword &&
    !values.name &&
    !values.gender &&
    !values.region &&
    !values.state
  );
};

const validateFieldAddEmployee = (field: string, value?: string) => {
  if (value) return '';
  let fieldRequire = '';
  switch (field) {
    case 'gender':
      fieldRequire = 'genderRequire';
      break;
    case 'ktp':
      fieldRequire = 'ktpRequire';
      break;
    case 'nc_id':
      fieldRequire = 'ncIdRequire';
      break;
    case 'type':
      fieldRequire = 'type';
      break;
  }
  return fieldRequire;
};

const validateName = (name: string) => {
  if (!name) {
    return 'nameRequire';
  }
  if (name.length > 50) {
    return 'maxximumValid';
  }
  return '';
};

const validateGender = (gender: any) => {
  if (gender === '') {
    return 'genderRequire';
  }
};

const validateKtp = (ktp_no: any) => {
  if (!ktp_no) {
    return 'ktpRequire';
  }
  if (ktp_no.length > 50) {
    return 'maxximumValid';
  }
  return '';
};

const validateNcId = (ncId: any) => {
  if (!ncId) {
    return 'ncIdRequire';
  }
  if (ncId.length > 50) {
    return 'maxximumValid';
  }
  return '';
};

const validateFieldMother = (motherName: string) => {
  if (motherName && motherName.length > 50) {
    return 'maxximumValid';
  }
  return '';
};

export const validateAddEmployee = (values: EmployeeParams): EmployeeValidate => {
  return {
    name: validateName(values.name),
    gender: validateGender(values.gender),
    motherName: validateFieldMother(values.motherName),
    ktp_no: validateKtp(values.ktp_no),
    nc_id: validateNcId(values.nc_id),
    type: validateFieldAddEmployee('type', values.type),
  };
};

export const validAddEmployee = (values: EmployeeValidate) => {
  return !values.gender && !values.ktp_no && !values.name && !values.nc_id && !values.type;
};

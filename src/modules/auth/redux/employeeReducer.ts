import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface EmployeeState {
  data: any;
  employeeAdd: any;
  search: string;
  title: string;
  contract: any;
  listCheck: number[];
  formPersonalInformation: any;
  formContractInformation: any;
  formEmployeeDetail: any;
  formOther: any;
  formSalaryNWage: any;
}

export const setEmployee = createCustomAction('setEmployee', (data: any) => ({
  data,
}));

export const setEmployeeAdd = createCustomAction('setEmployeeAdd', (data: any) => ({
  data,
}));

export const searchEmployee = createCustomAction('searchEmployee', (data: string) => ({
  data,
}));

export const setTitle = createCustomAction('getTitle', (data: string) => ({
  data,
}));

export const setContract = createCustomAction('setContract', (data: any[]) => ({
  data,
}));

export const setListCheckDelete = createCustomAction('setListCheck', (data: any[]) => ({
  data,
}));

export const setPersonalInformationForm = createCustomAction('setPersonalInformationForm', (data: any) => ({
  data,
}));

export const setContractInformationForm = createCustomAction('setContractInformationForm', (data: any) => ({
  data,
}));

export const setEmployeeDetailForm = createCustomAction('setEmployeeDetailForm', (data: any) => ({
  data,
}));

export const setOtherForm = createCustomAction('setOtherForm', (data: any) => ({
  data,
}));

export const setSalaryNWageForm = createCustomAction('setSalaryNWageForm', (data: any) => ({
  data,
}));

const actions = {
  setEmployee,
  setTitle,
  setEmployeeAdd,
  searchEmployee,
  setContract,
  setListCheckDelete,
  setPersonalInformationForm,
  setContractInformationForm,
  setEmployeeDetailForm,
  setOtherForm,
  setSalaryNWageForm,
};

type Action = ActionType<typeof actions>;

export default function reducer(state: any = {}, action: Action) {
  switch (action.type) {
    case getType(setEmployee):
      return { ...state, data: action.data };
    case getType(setEmployeeAdd):
      return { ...state, employeeAdd: action.data };
    case getType(searchEmployee):
      return { ...state, search: action.data };
    case getType(setTitle):
      return { ...state, title: action.data };
    case getType(setContract):
      return { ...state, contract: action.data };
    case getType(setListCheckDelete):
      return { ...state, listCheck: action.data };
    case getType(setPersonalInformationForm):
      return { ...state, formPersonalInformation: action.data };
    case getType(setContractInformationForm):
      return { ...state, formContractInformation: action.data };
    case getType(setEmployeeDetailForm):
      return { ...state, formEmployeeDetail: action.data };
    case getType(setOtherForm):
      return { ...state, formOther: action.data };
    case getType(setSalaryNWageForm):
      return { ...state, formSalaryNWage: action.data };
    default:
      return state;
  }
}

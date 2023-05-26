export interface Employee {
  id: number;
  name: string;
  gender: number;
  card_number: string;
  bank_account_no: string;
  family_card_number: string;
  marriage_code: string;
  mother_name: string;
  pob: string;
  dob: string;
  home_address_1: string;
  home_address_2: string;
  nc_id: string;
  contract_start_date: string;
  first_contract_date: string;
  secound_contract_date: string;
  deleted_at: string;
  department_name: string;
  type: string;
  basic_salary: number;
  position_name: string;
  entitle_ot: string;
  meal_allowance_paid: string;
  meal_allowance: number;
  grade_name: string;
}

export interface Column {
  id:
    | 'staff_id'
    | 'name'
    | 'gender'
    | 'card_number'
    | 'bank_account_no'
    | 'family_card_number'
    | 'marriage_code'
    | 'mother_name'
    | 'pob'
    | 'dob'
    | 'home_address'
    | 'nc_id'
    | 'contract_start_date'
    | 'first_contract_date'
    | 'secound_contract_date'
    | 'deleted_at'
    | 'department_name'
    | 'type'
    | 'basic_salary'
    | 'position_name'
    | 'entitle_ot'
    | 'meal_allowance_paid'
    | 'meal_allowance'
    | 'grade_name';
  label: string;
  minWidth?: number;
}

export interface EmployeeParams {
  name: string;
  gender: any;
  motherName: string;
  pob?: string;
  ktp_no: any;
  nc_id: any;
  address1?: string;
  address2?: string;
  mobileNo?: number;
  telNo?: number;
  bankCardNo?: number;
  bankAccountNo?: number;
  bankName?: string;
  familyCardNumber?: number;
  safetyInsuranceNo?: number;
  healthInsuranceNo?: number;
  type?: string;
}

export interface EmployeeValidate {
  name: string;
  gender: any;
  motherName: string;
  pob?: string;
  ktp_no: any;
  nc_id: any;
  address1?: string;
  address2?: string;
  mobileNo?: number;
  telNo?: number;
  bankCardNo?: number;
  bankAccountNo?: number;
  bankName?: string;
  familyCardNumber?: number;
  safetyInsuranceNo?: number;
  healthInsuranceNo?: number;
  type?: string;
}

export interface EmployeeAdd {
  name: string;
  card_number?: number;
  gender?: number;
  mother_name?: string;
  dob: string;
  pob?: string;
  ktp_no: number;
  nc_id: number;
  home_address_1?: string;
  home_address_2?: string;
  mobile_no?: number;
  tel_no?: number;
  marriage_id?: number;
  bank_account_no?: number;
  bank_name?: number;
  family_card_number?: number;
  safety_insurance_no?: number;
  health_insurance_no?: number;
  department_id?: number;
  position_id?: number;
  shift?: string;
  type: number;
  entitle_ot?: string;
  meal_allowance_paid?: string;
  operational_allowance_paid?: string;
  attendance_allowance_paid?: string;
  basic_salary: number;
  audit_salary: number;
  safety_insurance: number;
  health_insurance: number;
  meal_allowance: number;
  contract_start_date: string;
  grade_id?: number;
  remark?: string;
  benefits?: number[];
  account_user_id: number;
}

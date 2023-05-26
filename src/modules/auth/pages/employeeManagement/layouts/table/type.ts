import { Column } from '../../../../../../models/employee';

export const TYPE: { [key: string]: string } = {
  '0': 'Permanent',
  '1': 'Part-time',
  '2': 'Contract',
};

export const GENDER: { [key: number]: string } = {
  0: 'Male',
  1: 'Female',
};

export const ENTITLE: { [key: number]: any } = {
  0: null,
  1: 'Yes',
};

export const columns: readonly Column[] = [
  { id: 'staff_id', label: 'NIK', minWidth: 85 },
  { id: 'name', label: 'Name', minWidth: 140 },
  { id: 'gender', label: 'Gender', minWidth: 60 },
  { id: 'card_number', label: 'Bank Card No.', minWidth: 120 },
  { id: 'bank_account_no', label: 'Bank Account No.', minWidth: 140 },
  { id: 'family_card_number', label: 'Family Card No.', minWidth: 140 },
  { id: 'marriage_code', label: 'Marriage Status', minWidth: 140 },
  { id: 'mother_name', label: 'Mother Name', minWidth: 140 },
  { id: 'pob', label: 'Place of birth', minWidth: 105 },
  { id: 'dob', label: 'Date of birth', minWidth: 105 },
  { id: 'home_address', label: 'Home Address', minWidth: 660 },
  { id: 'nc_id', label: 'National Card ID No.', minWidth: 150 },
  { id: 'contract_start_date', label: 'Date Start', minWidth: 80 },
  { id: 'first_contract_date', label: 'First Contract', minWidth: 100 },
  { id: 'secound_contract_date', label: 'Secound Contract', minWidth: 120 },
  { id: 'deleted_at', label: 'End Contract', minWidth: 100 },
  { id: 'department_name', label: 'Department', minWidth: 140 },
  { id: 'type', label: 'Employee Type', minWidth: 110 },
  { id: 'basic_salary', label: 'Salary Rp.', minWidth: 80 },
  { id: 'position_name', label: 'Position', minWidth: 140 },
  { id: 'entitle_ot', label: 'O/T Paid', minWidth: 70 },
  { id: 'meal_allowance_paid', label: 'Meal paid', minWidth: 80 },
  { id: 'meal_allowance', label: 'Meal Rp', minWidth: 70 },
  { id: 'grade_name', label: 'Grading', minWidth: 70 },
];

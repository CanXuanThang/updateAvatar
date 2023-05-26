import { TableBody } from '@mui/material';
import { Employee } from '../../../../../../models/employee';
import Rows from './Rows';
import { ENTITLE, GENDER, TYPE } from './type';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setListCheckDelete } from '../../../../redux/employeeReducer';

interface Props {
  data: Employee[];
  columns: any;
  check: boolean;
}

function ContainerTableBody(props: Props) {
  const { data, columns, check } = props;
  const [listCheck, setListCheck] = useState<number[]>([]);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  useEffect(() => {
    dispatch(setListCheckDelete(listCheck));
  }, [dispatch, listCheck]);

  const rows = data.map((data: any) => {
    const first_contract_date = data.contracts.slice(0, 1);
    const secound_contract_date = data.contracts.slice(1, 2);

    let gender = GENDER[data.gender];
    let type = TYPE[data.type];
    let entitle_ot = ENTITLE[data.entitle_ot];
    let meal_allowance_paid = ENTITLE[data.meal_allowance_paid];
    let basic_salary = data.basic_salary.toLocaleString('en-US');
    let meal_allowance = data.meal_allowance.toLocaleString('en-US');

    return {
      id: data.id,
      staff_id: data.staff_id,
      name: data.name,
      gender: gender,
      card_number: data.card_number,
      bank_account_no: data.bank_account_no,
      family_card_number: data.family_card_number,
      marriage_code: data.marriage_code,
      mother_name: data.mother_name,
      pob: data.pob,
      dob: data.dob,
      home_address: {
        home_address_1: data.home_address_1,
        home_address_2: data.home_address_2,
      },
      nc_id: data.nc_id,
      contract_start_date: data.contract_start_date,
      first_contract_date: first_contract_date.map((item: any) => item.contract_date),
      secound_contract_date: secound_contract_date.map((item: any) => item.contract_date),
      deleted_at: data.deleted_at,
      department_name: data.department_name,
      type: type,
      basic_salary: basic_salary,
      position_name: data.position_name,
      entitle_ot: entitle_ot,
      meal_allowance_paid: meal_allowance_paid,
      meal_allowance: meal_allowance,
      grade_name: data.grade_name,
    };
  });

  return (
    <TableBody>
      {rows.map((row: any, index: number) => (
        <Rows checked={check} row={row} columns={columns} key={index} listCheck={setListCheck} />
      ))}
    </TableBody>
  );
}

export default ContainerTableBody;

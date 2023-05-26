import { useEffect, useState } from 'react';
import { validAddEmployee, validateAddEmployee } from '../../../../../../../utils';
import { Box, FormControl, InputBase, MenuItem, Select, Stack } from '@mui/material';
import ContainerField from './ContainerField';
import { EmployeeParams } from '../../../../../../../../../models/employee';
import { FormattedMessage } from 'react-intl';
import InputDateTime from '../../InputDateTime';

interface Props {
  dataForm: any;
}

function InfoForm1({ dataForm }: Props) {
  const [validate, setValidate] = useState<any>();
  const [date, getDate] = useState<any>();
  const [validateForm, setValidateForm] = useState<any>({
    name: '',
    gender: '',
    mother_name: '',
    dob: '',
    pob: '',
    ktp_no: '',
    nc_id: '',
    home_address_1: '',
    home_address_2: '',
  });

  useEffect(() => {
    setValidateForm((prevFormContract: any) => ({
      ...prevFormContract,
      dob: date,
    }));
  }, [date]);

  const handleBlur = () => {
    validateAndHandle(validateForm);
  };

  useEffect(() => {
    if (
      validateForm.gender !== '' ||
      validateForm.ktp_no !== '' ||
      validateForm.name !== '' ||
      validateForm.nc_id !== ''
    ) {
      validateAndHandle(validateForm);
    }
  }, [validateForm]);

  useEffect(() => {
    dataForm(validateForm);
  }, [validateForm, dataForm]);

  const validateAndHandle = (form: EmployeeParams) => {
    const validate = validateAddEmployee(form);
    setValidate(validate);
    if (!validAddEmployee(validate)) {
      return;
    }
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ flex: '1 1 0%', paddingLeft: '20px', paddingRight: '20px', gap: '10px' }}
    >
      <ContainerField nameField="name" required="*">
        <InputBase
          sx={{
            backgroundColor: !!validate?.name ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
            border: !!validate?.name ? '1px solid rgb(243, 174, 175)' : 'none',
          }}
          value={validateForm.name}
          onChange={(e) => {
            setValidateForm({ ...validateForm, name: e.target.value });
          }}
          onBlur={handleBlur}
        />
        {!!validate?.name && (
          <small className="text-danger">
            <FormattedMessage id={validate?.name} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="gender" required="*">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              value={validateForm.gender}
              onChange={(e) => {
                setValidateForm({ ...validateForm, gender: e.target.value });
              }}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{
                backgroundColor: !!validate?.gender ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
                border: !!validate?.gender ? '1px solid rgb(243, 174, 175)' : 'none',
                div: { padding: '12px' },
              }}
              displayEmpty
              className="ip"
              onBlur={handleBlur}
            >
              <MenuItem value="" id="menu-item-1">
                <em
                  style={{
                    fontSize: '16px',
                    fontFamily: 'SVN-Sofia-Regular',
                    fontStyle: 'normal',
                    color: 'rgb(104, 112, 118)',
                  }}
                >
                  Choose Gender
                </em>
              </MenuItem>
              {['Male', 'Female'].map((option: string, index: number) => (
                <MenuItem key={index} className="menu-item" value={index}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {!!validate?.gender && (
          <small className="text-danger">
            <FormattedMessage id={validate?.gender} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="motherName">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.mother_name}
          onChange={(e) => setValidateForm({ ...validateForm, mother_name: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="dob" required="*">
        <InputDateTime getDate={getDate} />
      </ContainerField>
      <ContainerField nameField="pob">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.pob}
          onChange={(e) => setValidateForm({ ...validateForm, pob: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="ktp" required="*">
        <InputBase
          sx={{
            backgroundColor: !!validate?.ktp_no ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            border: !!validate?.ktp_no ? '1px solid rgb(243, 174, 175)' : 'none',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.ktp_no}
          onChange={(e) => {
            setValidateForm({ ...validateForm, ktp_no: Number(e.target.value) });
          }}
          type="number"
          onBlur={handleBlur}
        />
        {!!validate?.ktp_no && (
          <small className="text-danger">
            <FormattedMessage id={validate?.ktp_no} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="nc_id" required="*">
        <InputBase
          sx={{
            backgroundColor: !!validate?.ncId ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            border: !!validate?.ncId ? '1px solid rgb(243, 174, 175)' : 'none',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.nc_id}
          onChange={(e) => {
            setValidateForm({ ...validateForm, nc_id: Number(e.target.value) });
          }}
          type={'number'}
          onBlur={handleBlur}
        />
        {!!validate?.ncId && (
          <small className="text-danger">
            <FormattedMessage id={validate?.ncId} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="address1">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.home_address_1}
          onChange={(e) => setValidateForm({ ...validateForm, home_address_1: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="address2">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.home_address_2}
          onChange={(e) => setValidateForm({ ...validateForm, home_address_2: e.target.value })}
        />
      </ContainerField>
    </Stack>
  );
}

export default InfoForm1;

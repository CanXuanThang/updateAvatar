import { Box, FormControl, InputBase, MenuItem, Select, Stack } from '@mui/material';
import ContainerField from './ContainerField';
import { useEffect, useState } from 'react';

interface Props {
  dataForm: any;
}

function InfoForm2({ dataForm }: Props) {
  const [validateForm, setValidateForm] = useState<any>({
    mobile_no: '',
    marriage_id: '',
    tel_no: '',
    card_number: '',
    bank_account_no: '',
    bank_name: '',
    family_card_number: '',
    safety_insurance_no: '',
    health_insurance_no: '',
  });

  useEffect(() => {
    dataForm(validateForm);
  }, [dataForm, validateForm]);
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ flex: '1 1 0%', paddingLeft: '20px', paddingRight: '20px', gap: '10px' }}
    >
      <ContainerField nameField="mobileNo">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.mobile_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, mobile_no: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="telNo">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.tel_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, tel_no: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="marriageStatus">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              value={validateForm.marriage_id}
              onChange={(e) => {
                setValidateForm({ ...validateForm, marriage_id: e.target.value });
              }}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{
                backgroundColor: 'rgb(241, 243, 245)',
                div: { padding: '12px' },
              }}
              displayEmpty
              className="ip"
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
              {['N/A', 'Married with 1 kid', 'Single', 'Married'].map((option: string, index: number) => (
                <MenuItem key={index} className="menu-item" value={index}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </ContainerField>
      <ContainerField nameField="bankCardNo">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.card_number}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, card_number: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="bankAccountNo">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.bank_account_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, bank_account_no: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="bankName">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.bank_name}
          onChange={(e) => setValidateForm({ ...validateForm, bank_name: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="familyCardNumber">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.family_card_number}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, family_card_number: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="siNo">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.safety_insurance_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, safety_insurance_no: e.target.value })}
        />
      </ContainerField>
      <ContainerField nameField="hiNo">
        <InputBase
          sx={{
            backgroundColor: 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.health_insurance_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, health_insurance_no: e.target.value })}
        />
      </ContainerField>
    </Stack>
  );
}

export default InfoForm2;

import { Box, FormControl, Grid, Input, InputAdornment, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setSalaryNWageForm } from '../../../../../../redux/employeeReducer';

function SalaryNWageForm() {
  const [formSalary, setFormSalary] = useState({
    basic_salary: '',
    audit_salary: '',
    safety_insurance: '',
    health_insurance: '',
    meal_allowance: '',
  });
  const items = [
    {
      text: 'Basic Salary',
      required: '*',
      value: formSalary.basic_salary,
      field: 'basic_salary',
    },
    {
      text: 'Basic Salary (Audit)',
      required: '*',
      value: formSalary.audit_salary,
      field: 'audit_salary',
    },
    {
      text: 'Safety Insurance Amount',
      required: '*',
      value: formSalary.safety_insurance,
      field: 'safety_insurance',
    },
    {
      text: 'Healthy Insurance Amount',
      value: formSalary.health_insurance,
      field: 'health_insurance',
    },
    {
      text: 'Meal Allowance',
      required: '*',
      value: formSalary.meal_allowance,
      field: 'meal_allowance',
    },
  ];

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  useEffect(() => {
    dispatch(setSalaryNWageForm(formSalary));
  }, [dispatch, formSalary]);

  return (
    <Box>
      <Stack
        component="form"
        direction="column"
        spacing={2}
        sx={{
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
          gap: '4px',
          display: 'flex',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        {items.map((item) => (
          <Grid
            container
            spacing={'row'}
            sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
            key={item.text}
          >
            <Grid
              item
              xs={5}
              sx={{
                paddingLeft: '0 !important',
                paddingTop: '0 !important',
                display: 'flex',
                alignItems: 'center',
                marginTop: '0 !important',
              }}
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  fontFamily: 'SVN-Sofia-Regular',
                  display: 'flex',
                  alignItems: 'center',
                  margin: 0,
                  fontSize: '16px',
                }}
              >
                {item.text}
                <Box component="span" sx={{ color: 'rgb(229, 72, 77)', margin: 0 }}>
                  {item.required}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={7} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
              <FormControl sx={{ width: '100%' }}>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  type="number"
                  value={item.value}
                  onChange={(e) =>
                    setFormSalary((prevFormSalary) => ({
                      ...prevFormSalary,
                      [item.field]: Number(e.target.value),
                    }))
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <Typography component="p" sx={{ fontFamily: 'SVN-Sofia-Regular', color: 'rgb(0, 106, 220)' }}>
                        Rp
                      </Typography>
                    </InputAdornment>
                  }
                  sx={{
                    '&:before': { content: 'none' },
                    input: { padding: '12px' },
                    paddingLeft: '12px',
                    backgroundColor: 'rgb(241, 243, 245)',
                    borderRadius: '6px',
                    fontFamily: 'SVN-Sofia-Regular',
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        ))}
      </Stack>
    </Box>
  );
}

export default SalaryNWageForm;

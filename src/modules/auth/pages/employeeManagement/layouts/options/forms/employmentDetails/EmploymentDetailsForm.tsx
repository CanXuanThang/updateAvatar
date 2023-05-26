import { Box, FormControl, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setEmployeeDetailForm } from '../../../../../../redux/employeeReducer';

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgb(48, 164, 108)',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: '24px',
          height: '24px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'SVN-Sofia-Regular',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: '-11px !important',
        },
      },
    },
  },
});

const svg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fontSize="medium">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="white"></rect>
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="#D7DBDF"></rect>
  </svg>
);

function EmploymentDetailsForm() {
  const [formDetail, setFormDetail] = useState({
    department_id: '',
    position_id: '',
    entitle_ot: false,
    meal_allowance_paid: false,
    operational_allowance_paid: true,
    attendance_allowance_paid: true,
  });

  if (formDetail.entitle_ot && formDetail.meal_allowance_paid) {
    formDetail.operational_allowance_paid = false;
    formDetail.attendance_allowance_paid = false;
  } else {
    formDetail.operational_allowance_paid = true;
    formDetail.attendance_allowance_paid = true;
  }

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  useEffect(() => {
    dispatch(setEmployeeDetailForm(formDetail));
  }, [dispatch, formDetail]);

  return (
    <Stack
      component="form"
      direction="column"
      spacing={2}
      sx={{
        padding: '0 20px 20px 20px',
        gap: '10px',
        display: 'flex',
        maxWidth: '560px',
        width: '100%',
      }}
    >
      <Grid container spacing={'row'} sx={{ '&:first-of-type': { marginLeft: '0' }, marginTop: '0 !important' }}>
        <Grid
          item
          xs={12}
          md={5}
          xl={4}
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
            Department
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} xl={8} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                value={formDetail.department_id}
                onChange={(e) => setFormDetail({ ...formDetail, department_id: e.target.value })}
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ background: '#f1f3f5', div: { padding: '12px' } }}
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
                    Choose Department
                  </em>
                </MenuItem>
                {['N/A', 'Developer', 'Quanlity Controjk', 'Maintenance', 'Business Developer'].map(
                  (option: string, index: number) => (
                    <MenuItem key={index} className="menu-item" value={option === 'N/A' ? 0 : 5 - index}>
                      {option}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={'row'}
        sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
      >
        <Grid
          item
          xs={12}
          md={5}
          xl={4}
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
            Position
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} xl={8} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                value={formDetail.position_id}
                onChange={(e) => setFormDetail({ ...formDetail, position_id: e.target.value })}
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ background: '#f1f3f5', div: { padding: '12px' } }}
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
                    Choose Position
                  </em>
                </MenuItem>
                {['N/A', 'Junior', 'Vice Manager', 'Manager'].map((option: string, index: number) => (
                  <MenuItem key={index} className="menu-item" value={option === 'N/A' ? 0 : 4 - index}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <ThemeProvider theme={theme}>
        <FormControlLabel
          control={
            <Checkbox
              icon={svg}
              checked={formDetail.entitle_ot}
              onChange={(e) => setFormDetail({ ...formDetail, entitle_ot: e.target.checked })}
              sx={{
                '&.Mui-checked': {
                  color: 'rgb(48, 164, 108)',
                },
              }}
            />
          }
          label="Entitled OT"
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={svg}
              checked={formDetail.meal_allowance_paid}
              onChange={(e) => setFormDetail({ ...formDetail, meal_allowance_paid: e.target.checked })}
              sx={{
                '&.Mui-checked': {
                  color: 'rgb(48, 164, 108)',
                },
              }}
            />
          }
          label="Meal Allowance Paid"
        />
        <FormControlLabel
          control={<Checkbox checked={formDetail.operational_allowance_paid} icon={svg} disabled />}
          label="Operational Allowance Paid"
        />
        <FormControlLabel
          control={<Checkbox icon={svg} checked={formDetail.attendance_allowance_paid} disabled />}
          label="Attendance Allowance Paid"
        />
      </ThemeProvider>
    </Stack>
  );
}

export default EmploymentDetailsForm;

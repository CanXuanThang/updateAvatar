import { Box, Divider, FormControl, Grid, InputBase, MenuItem, Select, Stack, Typography } from '@mui/material';
import InputDateTime from '../InputDateTime';
import ContainerButton from './ContainerButton';
import TableUpdate from './TableUpdate';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setContractInformationForm } from '../../../../../../redux/employeeReducer';

function ContractInformationForm() {
  const [date, getDate] = useState<any>();
  const [data, getData] = useState<any>();
  const [formContract, setFormContract] = useState({
    contract_date: '',
    name: '',
    document: '',
    document_file: [],
    employee_id: -1,
    action: 'add',
  });
  const [formContractInfo, setFormContractInfo] = useState({
    contract_start_date: '',
    type: '',
    contracts: [],
  });
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  useEffect(() => {
    dispatch(setContractInformationForm(formContractInfo));
  }, [dispatch, formContractInfo]);

  useEffect(() => {
    setFormContractInfo((prevFormContract) => ({
      ...prevFormContract,
      contracts: data,
    }));
  }, [data]);

  useEffect(() => {
    setFormContract((prevFormContract) => ({
      ...prevFormContract,
      contract_date: date,
    }));
    setFormContractInfo((prevFormContract) => ({
      ...prevFormContract,
      contract_start_date: date,
    }));
  }, [date]);

  console.log(formContractInfo.contract_start_date);

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
          gap: '10px',
          display: 'flex',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Grid
          container
          spacing={'row'}
          sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
        >
          <Grid
            item
            xs={4}
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
              Date Start
              <Box component="span" sx={{ color: 'rgb(229, 72, 77)', margin: 0 }}>
                *
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={8} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
            <InputDateTime getDate={getDate} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={'row'}
          sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
        >
          <Grid
            item
            xs={4}
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
              Employee Type
              <Box component="span" sx={{ color: 'rgb(229, 72, 77)', margin: 0 }}>
                *
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={8} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ background: '#f1f3f5', div: { padding: '12px' } }}
                  displayEmpty
                  value={formContractInfo.type}
                  onChange={(e) => {
                    setFormContractInfo({ ...formContractInfo, type: e.target.value });
                  }}
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
                      Choose Type
                    </em>
                  </MenuItem>
                  {['Permanent', 'Part-time', 'Contract'].map((option: string, index: number) => (
                    <MenuItem key={index} className="menu-item" value={index}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Stack
        sx={{ span: { fontFamily: 'SVN-Sofia-Regular' }, border: '1px solid rgb(223, 227, 230)', borderRadius: '6px' }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: '12px',
            color: 'rgb(104,112,118)',
            fontWeight: 600,
            padding: '5px 20px',
            backgroundColor: 'rgb(241, 243, 245)',
          }}
        >
          CONTRACT:
        </Typography>
        <Typography
          component="p"
          sx={{ fontFamily: 'SVN-Sofia-Regular', fontSize: '14px', color: 'rgb(104, 112, 118)', padding: '10px 20px' }}
        >
          Please upload pdf, png, xlsx, docx file format!
        </Typography>
        <Divider />
        <Stack sx={{ flexFlow: 'row wrap', gap: '18px', padding: '20px 14px 30px 20px' }}>
          <Stack
            component="form"
            direction="column"
            spacing={2}
            sx={{
              gap: '10px',
              display: 'flex',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <Grid
              container
              spacing={'row'}
              sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
            >
              <Grid
                item
                xs={4}
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
                  Contract Date
                </Typography>
              </Grid>
              <Grid item xs={8} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
                <InputDateTime getDate={getDate} />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={'row'}
              sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
            >
              <Grid
                item
                xs={4}
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
                  Contract Name
                </Typography>
              </Grid>
              <Grid item xs={8} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
                <InputBase
                  sx={{
                    backgroundColor: 'rgb(241, 243, 245)',
                    input: { padding: '12px' },
                    borderRadius: '6px',
                    width: '100%',
                  }}
                  value={formContract.name}
                  onChange={(e) => setFormContract({ ...formContract, name: e.target.value })}
                />
              </Grid>
            </Grid>
            <ContainerButton data={formContract} getData={getData} />
          </Stack>
          <Divider
            sx={{
              height: 'auto !important',
              borderWidth: '0px thin 0px 0px !important',
              borderColor: 'rgba(193, 200, 205, 0.24) !impotant',
            }}
          />
          <Box>
            <TableUpdate dataTable={data} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ContractInformationForm;

import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import SearchBar from './SeachBar';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { push } from 'connected-react-router';
import { ROUTES } from '../../../../../../configs/routes';
import { useCallback, useMemo } from 'react';
import axios from 'axios';
import { API_PATHS } from '../../../../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../../../../utils/httpResponseCode';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../../../utils/constants';

interface Props {
  name: string;
  bool: boolean;
}

const HeaderContent = ({ name, bool }: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const formPersonalInfomation = useSelector((state: any) => state.employee.formPersonalInformation);
  const formContractInfomation = useSelector((state: any) => state.employee.formContractInformation);
  const formEmployeeDatail = useSelector((state: any) => state.employee.formEmployeeDetail);
  const formOther = useSelector((state: any) => state.employee.formOther);
  const formSalaryNWage = useSelector((state: any) => state.employee.formSalaryNWage);
  const userId = { account_user_id: null, shift: 1 };
  const data = useMemo(
    () => ({
      ...formPersonalInfomation,
      ...formContractInfomation,
      ...formEmployeeDatail,
      ...formOther,
      ...formSalaryNWage,
      ...userId,
    }),
    [formPersonalInfomation, formContractInfomation, formEmployeeDatail, formOther, formSalaryNWage],
  );

  const handleAddEmployee = useCallback(async () => {
    const json = await axios.post(API_PATHS.employee, data, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN_KEY),
      },
    });
    if (json.status === RESPONSE_STATUS_SUCCESS) {
      dispatch(push(ROUTES.employee));
    }
  }, [dispatch, data]);

  return (
    <Box sx={{ marginBottom: '20px' }}>
      <List className="d-flex align-items-center p-0">
        {name ? (
          <ListItem sx={{ padding: 0, marginLeft: '3px' }}>
            <ListItemText
              sx={{
                maxWidth: '50px',
                span: { fontSize: '14px', fontWeight: 400, fontFamily: 'SVN-Sofia-Regular', display: 'inline-block' },
                color: 'rgb(104, 112, 118)',
                cursor: 'pointer',
              }}
              onClick={() => dispatch(push(ROUTES.home))}
            >
              Gereral
            </ListItemText>
            <span className="mx-2">›</span>
            <ListItemText
              sx={{
                maxWidth: '200px',
                span: { fontSize: '14px', fontFamily: 'SVN-Sofia-Regular', display: 'inline-block' },
              }}
            >
              {name}
            </ListItemText>
          </ListItem>
        ) : null}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontFamily: 'SVN-Sofia-Medium', fontWeight: 500, fontSize: '36px', margin: 0 }}
        >
          {name}
        </Typography>
        {bool ? (
          <SearchBar />
        ) : (
          <Button
            sx={{
              textTransform: 'none',
              padding: '8px 22px',
              backgroundColor: 'rgba(193, 200, 205, 0.24)',
              minWidth: '78px',
              height: '48px',
              fontWeight: '400',
              fontFamily: 'SVN-Sofia-Regular',
              fontSize: '16px',
            }}
            // disabled
            onClick={handleAddEmployee}
          >
            Add
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default HeaderContent;

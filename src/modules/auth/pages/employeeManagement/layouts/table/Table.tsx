import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { API_PATHS } from '../../../../../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../../../utils/constants';
import ContainerTableBody from './ContainerTableBody';
import { Employee } from '../../../../../../models/employee';
import Checkbox from '@mui/material/Checkbox';

import './Table.scss';
import { RESPONSE_STATUS_SUCCESS } from '../../../../../../utils/httpResponseCode';
import { Button, CircularProgress, Stack } from '@mui/material';
import { columns } from './type';
import Pagination from '../pagination/Pagination';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../../../../configs/routes';

export default function Tables() {
  const [data, getData] = React.useState<Employee[]>([]);
  const [boolCheck, setBoolCheck] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisable] = React.useState<boolean>(true);
  const [dataAll, getDataAll] = React.useState([]);
  const [page, setPage] = React.useState<number>();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const valueSearch = useSelector((state: any) => state.employee.search);
  const listCheckDelete = useSelector((state: any) => state.employee.listCheck);

  const handleCheckbox = () => {
    setBoolCheck(!boolCheck);
  };

  const getEmployee = React.useCallback(async (page: number = 1, valueSearch: string = '') => {
    setLoading(true);
    const json = await axios.get(`${API_PATHS.employee}?search=${valueSearch}&?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN_KEY),
      },
    });

    setLoading(false);

    if (json?.status === RESPONSE_STATUS_SUCCESS) {
      getData(json.data.data.data);
      getDataAll(json.data.data);
      return;
    }
  }, []);

  const handleDelete = React.useCallback(async () => {
    if (listCheckDelete) {
      setLoading(true);
      await axios.delete(API_PATHS.deleteEmployee, {
        headers: {
          Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN_KEY),
        },
        data: {
          record_ids: listCheckDelete,
        },
      });
      setLoading(false);
    }
    getEmployee(page, valueSearch);
  }, [listCheckDelete, getEmployee, page, valueSearch]);

  React.useEffect(() => {
    if (listCheckDelete && listCheckDelete.length === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [listCheckDelete]);

  React.useEffect(() => {
    getEmployee(page, valueSearch);
  }, [valueSearch, page, getEmployee]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px', boxShadow: 'none' }}>
      <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'right', marginBottom: '10px' }}>
        <Button
          sx={{ textTransform: 'none', padding: '8px 12px', backgroundColor: 'rgb(237, 246, 255)', minWidth: '90px' }}
          onClick={() => dispatch(push(ROUTES.add))}
        >
          <span className="d-flex align-items-center">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svg-fill-all"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.7803 4.07322C12.921 4.21388 13 4.40464 13 4.60355V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.75 7.5C4.75 7.22386 4.97386 7 5.25 7H7V5.25C7 4.97386 7.22386 4.75 7.5 4.75C7.77614 4.75 8 4.97386 8 5.25V7H9.75C10.0261 7 10.25 7.22386 10.25 7.5C10.25 7.77614 10.0261 8 9.75 8H8V9.75C8 10.0261 7.77614 10.25 7.5 10.25C7.22386 10.25 7 10.0261 7 9.75V8H5.25C4.97386 8 4.75 7.77614 4.75 7.5Z"
                fill="rgb(0, 145, 255)"
              ></path>
            </svg>
            <p style={{ margin: 0, lineHeight: 1.35714, marginLeft: '6px' }}>Add</p>
          </span>
        </Button>
        <Button
          variant="text"
          color="error"
          sx={{
            padding: '8px 12px',
            backgroundColor: disabled ? 'rgb(241, 243, 245)' : 'rgb(255, 239, 239)',
            textTransform: 'none',
          }}
          disabled={disabled}
          onClick={handleDelete}
        >
          <span className="d-flex align-items-center">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svg-fill-all"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                fill={disabled ? 'rgb(193, 200, 205)' : 'rgb(229, 72, 77)'}
              ></path>
            </svg>
            <p style={{ margin: 0, lineHeight: 1.35714, marginLeft: '6px' }}>Delete</p>
          </span>
        </Button>
      </Stack>
      <TableContainer sx={{ maxHeight: 525, minHeight: 525, textAlign: 'center' }}>
        {loading ? (
          <CircularProgress sx={{ position: 'absolute', top: '50%', transform: 'transalateY(-50%)' }} />
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox checked={boolCheck} onChange={handleCheckbox} color="success" />
                </TableCell>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    style={{
                      minWidth: column.minWidth,
                      textAlign: column.label === 'Home Address' ? 'center' : 'left',
                    }}
                    colSpan={column.label === 'Home Address' ? 2 : 1}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <ContainerTableBody data={data} columns={columns} check={boolCheck} />
          </Table>
        )}
      </TableContainer>
      <hr style={{ opacity: 0.04 }} />
      <Pagination onChangePage={onChangePage} dataAll={dataAll} />
    </Paper>
  );
}

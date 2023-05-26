import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../../../table/Table.scss';
import { Box, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Column {
  id: 'no' | 'contract_name' | 'sign_date' | 'action';
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: 'no', label: 'No', minWidth: 20 },
  { id: 'contract_name', label: 'Contract Name', minWidth: 120 },
  {
    id: 'sign_date',
    label: 'Sign Date',
    minWidth: 120,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 270,
  },
];

interface Data {
  no: number;
  contract_name: string;
  sign_date: string;
  action: number;
}

interface Props {
  dataTable: any;
}

export default function TableUpdate({ dataTable }: Props) {
  function createData(
    no: number,
    contract_name: string = dataTable.name,
    sign_date: string = dataTable.date,
    action: any,
  ): Data {
    return { no, contract_name, sign_date, action };
  }

  console.log(dataTable);

  const rows = dataTable && dataTable.map((a: any, index: number) => createData(index, a.name, a.contract_date, index));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '225px', minHeight: '225px', width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth, textAlign: 'center' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      if (column.id === 'action') {
                        return (
                          <TableCell key={column.id}>
                            <Box sx={{ minWidth: '125px' }}></Box>
                            <Button
                              variant="text"
                              color="error"
                              sx={{
                                backgroundColor: 'rgb(255, 239, 239)',
                                textTransform: 'none',
                                padding: '0 12px',
                                minWidth: '40px',
                              }}
                            >
                              <DeleteOutlineIcon /> Delete
                            </Button>
                          </TableCell>
                        );
                      } else {
                        return <TableCell key={column.id}>{value}</TableCell>;
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

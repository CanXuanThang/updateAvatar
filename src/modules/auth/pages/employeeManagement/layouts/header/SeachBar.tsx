import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { searchEmployee } from '../../../../redux/employeeReducer';
import useDebounce from '../../../../hooks/useDebounce';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    border: '1px solid #000',
  },
  '&:active': {
    border: '1px solid red',
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '6px',
    [theme.breakpoints.up('sm')]: {
      width: '16ch',
    },
  },
}));

export default function SearchBar() {
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    dispatch(searchEmployee(debouncedValue));
  }, [debouncedValue, dispatch]);
  return (
    <Toolbar sx={{ paddingLeft: '2px !important', paddingRight: '0 !important' }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Search>
    </Toolbar>
  );
}

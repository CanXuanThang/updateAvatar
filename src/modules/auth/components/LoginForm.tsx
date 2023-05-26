import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validateLogin, validLogin } from '../utils';

import '../pages/LoginPage.scss';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { Alert, IconButton, InputAdornment, OutlinedInput, Snackbar } from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;

  const [formValues, setFormValues] = React.useState<ILoginParams>({
    username: '',
    password: '',
    company_id: 0,
  });
  const [validate, setValidate] = React.useState<ILoginValidation>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      setErrorSnackbarOpen(true);
    }
  }, [loading]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setFormValues({ ...formValues, company_id: Number(event.target.value) });
  };

  const onSubmit = () => {
    const validate = validateLogin(formValues);
    setValidate(validate);
    if (!validLogin(validate)) {
      return;
    }
    onLogin(formValues);
  };

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const handlePage = () => {
    dispatch(replace(ROUTES.forgotPassword));
  };

  return (
    <form
      style={{ maxWidth: '560px', width: '100%', display: 'flex', justifyContent: 'center' }}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="row g-3 needs-validation"
    >
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error">Incorrect Username, Password or Factory. Please try again!</Alert>
      </Snackbar>
      <h3 className="title" style={{ marginTop: '56px' }}>
        Sign In
      </h3>
      <div className="sign-in">
        {!!errorMessage && (
          <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
            {errorMessage}
          </div>
        )}

        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label mt-2" style={{ fontWeight: 500 }}>
            <FormattedMessage id="email" />
          </label>
          <input
            type="text"
            className="form-control ip"
            id="inputEmail"
            style={{ background: '#f1f3f5', padding: '16px 12px' }}
            value={formValues.username}
            maxLength={30}
            onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
          />

          {!!validate?.username && (
            <small className="text-danger">
              <FormattedMessage id={validate?.username} />
            </small>
          )}
        </div>

        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label mt-2" style={{ fontWeight: 500 }}>
            <FormattedMessage id="password" />
          </label>
          <FormControl fullWidth>
            <OutlinedInput
              id="outlined-adornment-password inputPassword"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {formValues.password.length > 0 && <span>{showPassword ? <VisibilityOff /> : <Visibility />}</span>}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {!!validate?.password && (
            <small className="text-danger">
              <FormattedMessage id={validate?.password} />
            </small>
          )}
        </div>

        <div className="col-12">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <label htmlFor="inputPassword" className="form-label mt-2" style={{ fontWeight: 500 }}>
                <FormattedMessage id="factory" />
              </label>
              <Select
                defaultValue=""
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ background: '#f1f3f5' }}
                displayEmpty
                className="ip"
              >
                <MenuItem value="" className="menu-item-1" disabled>
                  <em
                    style={{
                      fontSize: '16px',
                      fontFamily: 'SVN-Sofia-Regular',
                      fontStyle: 'normal',
                      color: 'rgb(104, 112, 118)',
                    }}
                  >
                    Select Factory
                  </em>
                </MenuItem>
                <MenuItem className="menu-item" value={1}>
                  SBM
                </MenuItem>
                <MenuItem className="menu-item" value={2}>
                  DMF
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {!!validate?.factory && (
            <small className="text-danger">
              <FormattedMessage id={validate?.factory} />
            </small>
          )}
        </div>

        <div className="row justify-content-md-center" style={{ margin: '42px 0 12px 0' }}>
          <div className="col-md-auto" style={{ width: '100%', padding: 0 }}>
            <button
              className="btn btn-lg css-btn"
              type="submit"
              style={{
                width: '100%',
                fontSize: 16,
                padding: 12,
                backgroundColor: 'rgb(0, 145, 255)',
                color: '#fff',
              }}
            >
              <FormattedMessage id="register" />
            </button>
          </div>
        </div>
        <div onClick={handlePage}>
          <span
            className="d-flex justify-content-center forgot-password"
            style={{ cursor: 'pointer', color: '#0091FF', fontSize: 14 }}
          >
            Forgot Your Password?
          </span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

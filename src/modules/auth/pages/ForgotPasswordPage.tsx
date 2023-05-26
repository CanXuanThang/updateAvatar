import { useDispatch } from 'react-redux';
import logo from '../../../imagies/Rectangle4.png';
import ForgotPasswordForm from '../components/forgotPassword/ForgotPasswordForm';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { useCallback, useEffect, useState } from 'react';
import { ForgorPasswordParams } from '../../../models/auth';
import axios from 'axios';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';

import '../components/forgotPassword/ForgotPasswordForm.scss';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { getErrorMessageResponse } from '../../../utils';
import { Alert, Snackbar } from '@mui/material';

function ForgotPasswordPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const onLogin = useCallback(
    async (values: ForgorPasswordParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await axios.post(API_PATHS.forgotPassword, {
        email: values.email,
      });

      setLoading(false);

      if (json?.status === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        dispatch(replace(ROUTES.login));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  useEffect(() => {
    if (loading) {
      setErrorSnackbarOpen(true);
    }
    setLoading(false);
  }, [loading]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#f8f9fa',
      }}
    >
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error">Please try again with an valid email address.</Alert>
      </Snackbar>
      <img src={logo} alt="" style={{ width: '100px', height: '100px', marginTop: '64px' }} />
      <h3 className="title">HR Management System</h3>
      <ForgotPasswordForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
      <span className="footer">Copyright © 2022. All Rights Reserved</span>
    </div>
  );
}

export default ForgotPasswordPage;

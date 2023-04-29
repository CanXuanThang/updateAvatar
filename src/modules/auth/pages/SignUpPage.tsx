import SignUpForm from '../components/SignUpForm';
import logo from '../../../logo-420-x-108.png';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { useCallback, useEffect, useState } from 'react';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { ISignUpParams } from '../../../models/singup';
import { getErrorMessageResponse } from '../../../utils';

function SignUpPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);
  const [idRegion, setIdRegion] = useState('');

  const getLocation = useCallback(async (idRegion?: string) => {
    setLoading(true);

    const json = await dispatch(
      fetchThunk(idRegion ? `${API_PATHS.getLocation}?pid=${idRegion}` : API_PATHS.getLocation, 'get'),
    );

    setLoading(false);

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      idRegion ? setStates(json.data) : setLocations(json.data);
      return;
    }
  }, []);

  useEffect(() => {
    getLocation(idRegion);
  }, [getLocation, idRegion]);

  const onSignUp = useCallback(
    async (values: ISignUpParams) => {
      setErrorMessage('');
      setLoading(true);

      console.log(values);

      const json = await dispatch(fetchThunk(API_PATHS.signUp, 'post', values));

      setLoading(false);

      console.log(json?.code);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        alert('Chúc mừng bạn đã đăng kí tài khoản thành công');
        // Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  const onChangeRegion = (idRegion: string) => {
    setIdRegion(idRegion);
  };

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />
      <SignUpForm
        onSignUp={onSignUp}
        loading={loading}
        errorMessage={errorMessage}
        locations={locations}
        states={states}
        onChangeRegion={onChangeRegion}
      />
    </div>
  );
}

export default SignUpPage;

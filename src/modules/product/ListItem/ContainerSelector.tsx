import Selector from './Selector';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { API_PATHS } from '../../../configs/api';
import { fetchThunk } from '../../common/redux/thunk';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';

function ContainerSelector() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getLocation = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.getProduct, 'get'));

    setLoading(false);
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setData(json.data);
      return;
    }
  }, [setData, dispatch]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="d-flex">
      <Selector data={data} />
    </div>
  );
}

export default ContainerSelector;

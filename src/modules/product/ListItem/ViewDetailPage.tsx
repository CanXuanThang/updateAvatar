import { useLocation } from 'react-router';
import { UpdateProduct } from '../../../models/product';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import ViewDetail from './ViewDetail';
import { updateProduct } from '../redux/reduce';
// import { ToastContainer, toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';

function ViewDetailPage() {
  const { state } = useLocation<UpdateProduct>();
  const [id, setId] = useState<number>();
  const [data, setData] = useState<UpdateProduct>();
  const [loading, setLoading] = useState<boolean>(false);

  const item: UpdateProduct[] = Object.values(state);

  useEffect(() => {
    item.map((dataItem: UpdateProduct) => setId(dataItem.id));
  }, [item]);

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getProduct = useCallback(
    async (id: number) => {
      setLoading(true);
      const json = await dispatch(fetchThunk(`${API_PATHS.getProduct}/${id}`, 'get'));
      setLoading(false);
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        setData(json.data);
        return;
      }
    },
    [dispatch],
  );

  useEffect(() => {
    id && getProduct(id);
  }, [id, getProduct]);

  const onSubmit = useCallback(
    async (values: UpdateProduct) => {
      console.log(values);

      const json = await dispatch(fetchThunk(`${API_PATHS.updateProduct}`, 'put', values));
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        // toast.success('Cập nhật sản phẩm thành công');
        dispatch(updateProduct(json.data));
        dispatch(push(ROUTES.product));
        return;
      }
    },
    [dispatch],
  );

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="card d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
      {data && <ViewDetail data={data} onSubmitForm={onSubmit} />}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default ViewDetailPage;

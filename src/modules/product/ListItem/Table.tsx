import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Product } from '../../../models/product';
import { API_PATHS } from '../../../configs/api';
import { fetchThunk } from '../../common/redux/thunk';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { Link } from 'react-router-dom';

function Tables() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [boolDataItem, setBoolDataItem] = useState<boolean>(false);
  const [id, setID] = useState('');
  const dataSearch = useSelector((state: any) => state.product.searchProduct);

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getProduct = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.getProduct, 'get'));

    setLoading(false);
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setData(json.data);
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const dataItem =
    data &&
    dataSearch &&
    data.filter(
      (item) =>
        item.status === dataSearch.status ||
        item.client === dataSearch.client ||
        (item.invoice === dataSearch.invoice &&
          dataSearch.status !== 'Status' &&
          dataSearch.client !== 'Client' &&
          dataSearch.invoice !== ''),
    );

  const deleteProduct = useCallback(
    async (id?: string) => {
      if (id !== '') {
        await dispatch(fetchThunk(`${API_PATHS.getProduct}/${id}`, 'delete'));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    setData(data);
    if (dataItem && dataItem.length === 0) {
      setBoolDataItem(false);
    } else {
      setBoolDataItem(true);
    }
  }, [dataItem, setBoolDataItem, data]);

  useEffect(() => {
    deleteProduct(id);
  }, [deleteProduct, id]);

  const handleDelete = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = Number(e.currentTarget.value);
    setID(String(id));
    setData((prevData) => prevData.filter((item) => item.id !== id));
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Client</th>
          <th scope="col">Currency</th>
          <th scope="col">Total</th>
          <th scope="col">Invoice #</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {data && boolDataItem && dataItem
          ? dataItem.map((item: Product) => (
              <tr key={item.id}>
                <td>{item.status}</td>
                <td>{item.createdAt}</td>
                <td>{item.client}</td>
                <td>{item.currency}</td>
                <td>{item.total}</td>
                <td>{item.invoice}</td>
                <td>
                  <Link
                    to={{
                      pathname: '/detail',
                      state: { item },
                    }}
                  >
                    <button type="button" className="btn btn-primary">
                      View detail
                    </button>
                  </Link>
                </td>
                <td>
                  <button value={item.id} onClick={handleDelete} className="btn btn-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-archive"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          : data?.map((item: Product) => (
              <tr key={item.id}>
                <td>{item.status}</td>
                <td>{item.createdAt}</td>
                <td>{item.client}</td>
                <td>{item.currency}</td>
                <td>{item.total}</td>
                <td>{item.invoice}</td>
                <td>
                  <Link
                    to={{
                      pathname: '/detail',
                      state: { item },
                    }}
                  >
                    <button type="button" className="btn btn-primary">
                      View detail
                    </button>
                  </Link>
                </td>
                <td>
                  <button value={item.id} onClick={handleDelete} className="btn btn-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-archive"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}

export default Tables;

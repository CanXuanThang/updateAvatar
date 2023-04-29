import { Dispatch, useCallback, useState } from 'react';
import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { Product, SearchDataType } from '../../../models/product';
import { searchItemProduct } from '../redux/reduce';

interface Props {
  data: any;
}

function Selector(props: Props) {
  const { data } = props;
  const initialDataItem: SearchDataType = {
    status: 'Status',
    from: '',
    to: '',
    client: 'Client',
    invoice: '',
  };
  const dispatch: Dispatch<any> = useDispatch();
  const [dataItem, setDataItem] = useState<SearchDataType>(initialDataItem);

  const status = Array.from(
    new Set(data.filter((item: Product) => item.status !== null).map((item: Product) => item.status)),
  );

  const clients = Array.from(
    new Set(data.filter((item: Product) => item.client !== null).map((item: Product) => item.client)),
  );

  const handleApply = () => {
    dispatch(searchItemProduct(dataItem));
  };

  const handleClear = useCallback(() => {
    dispatch(searchItemProduct(initialDataItem));
    setDataItem(initialDataItem);
  }, [dispatch]);

  return (
    <div className="d-flex">
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Status"
        onChange={(e) => setDataItem({ ...dataItem, status: e.target.value })}
      >
        <option value={dataItem.status}>{dataItem.status}</option>
        {status &&
          status.map((item: any, index: number) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
      </select>
      <select
        className="form-select mx-4"
        aria-label="Default select example"
        defaultValue="Client"
        onChange={(e) => setDataItem({ ...dataItem, client: e.target.value })}
      >
        <option value={dataItem.client}>{dataItem.client}</option>
        {clients &&
          clients.map((item: any, index: number) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
      </select>
      <input
        type="datetime-local"
        aria-label="Default select example"
        className="form-select"
        id="birthdaytime"
        name="birthdaytime"
        style={{ height: 47, margin: 0 }}
        placeholder="From"
        onChange={(e) => setDataItem({ ...dataItem, from: e.target.value })}
      ></input>
      <input
        type="datetime-local"
        aria-label="Default select example"
        className="form-select mx-4"
        id="birthdaytime"
        name="birthdaytime"
        style={{ height: 47, margin: 0 }}
        onChange={(e) => setDataItem({ ...dataItem, to: e.target.value })}
      ></input>
      <input
        type="text"
        style={{ height: 47, margin: 0 }}
        placeholder="Invoice"
        aria-label="Default select example"
        className="form-select"
        onChange={(e) => setDataItem({ ...dataItem, invoice: e.target.value })}
      />
      <div className="d-flex flex-column " style={{ padding: 0 }}>
        <Space
          className="site-button-ghost-wrapper"
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <Button type="primary" className="mx-5" ghost onClick={handleApply}>
            Apply
          </Button>
          <Button type="primary" danger ghost onClick={handleClear}>
            Clear
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default Selector;

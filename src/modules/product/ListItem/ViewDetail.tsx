import { Product } from '../../../models/product';
import { ChangeEventHandler, useCallback, useState } from 'react';

interface Props {
  onSubmitForm(values: Product): void;
  data: Product;
}

function ViewDetail(props: Props) {
  const { onSubmitForm, data } = props;
  const { createdAt, updatedAt, createdBy, ...newObject } = data;
  const [dataItem, setDataItem] = useState<Product>(newObject);

  const onChangeTotal: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDataItem({
      ...dataItem,
      total: Number(e.target.value),
    });
  };

  const onChangeStatus: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDataItem({
      ...dataItem,
      status: e.target.value,
    });
  };

  const onSubmit = useCallback(() => {
    dataItem && onSubmitForm(dataItem);
  }, [dataItem, onSubmitForm]);

  console.log(dataItem);

  return (
    <div className="card d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
      {data && (
        <form
          className="card-body"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <h5 className="card-title">Product</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Status: <input type="text" value={dataItem.status} onChange={onChangeStatus} />
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">Client: {dataItem.client ? dataItem.client : 'Không có'}</h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Total: <input type="text" value={dataItem.total} onChange={onChangeTotal} />
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">Currency: {dataItem.currency}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Funding method: {dataItem.fundingMethod}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Order: {dataItem.order}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Invoice: {dataItem.invoice}</h6>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ViewDetail;

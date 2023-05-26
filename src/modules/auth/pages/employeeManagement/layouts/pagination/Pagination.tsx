import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import './Pagination.scss';
import React, { memo } from 'react';

interface Props {
  onChangePage(page: number): void;
  dataAll: any;
}

function Pagination(props: Props) {
  const { onChangePage, dataAll } = props;
  const [page, setPage] = React.useState<number>(1);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPage(Number(e.currentTarget.value));
  };
  React.useEffect(() => {
    page && onChangePage(page);
  }, [page, onChangePage]);

  return (
    <div className="d-flex">
      <div className="d-flex">
        <button
          className={`btn ${page === 1 ? 'btn-disable' : 'btn-custom-next'}`}
          style={{ boxShadow: 'none' }}
          disabled={page === 1 ? true : false}
          onClick={() => {
            if (page !== 1) setPage(1);
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </button>
        <button
          className={`btn ${page === 1 ? 'btn-disable' : 'btn-custom-next'}`}
          style={{ boxShadow: 'none' }}
          disabled={page === 1 ? true : false}
          onClick={() => {
            if (page !== 1) setPage(page - 1);
          }}
        >
          <ArrowBackIosIcon />
        </button>
        <div className="d-flex">
          {Array(dataAll.last_page)
            .fill(null)
            .map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === dataAll.current_page;

              return (
                <button
                  key={pageNumber}
                  value={pageNumber}
                  className={`btn btn-custom ${isActive ? 'active' : ''}`}
                  onClick={handleClick}
                  style={{ boxShadow: 'none' }}
                >
                  {pageNumber}
                </button>
              );
            })}
        </div>

        <button
          className={`btn ${page === dataAll.last_page ? 'btn-disable' : 'btn-custom-next'}`}
          style={{ boxShadow: 'none' }}
          disabled={page === dataAll.last_page ? true : false}
          onClick={() => {
            if (page !== dataAll.last_page) setPage(page + 1);
          }}
        >
          <ArrowForwardIosIcon />
        </button>
        <button
          className={`btn ${page === dataAll.last_page ? 'btn-disable' : 'btn-custom-next'}`}
          style={{ boxShadow: 'none' }}
          disabled={page === dataAll.last_page ? true : false}
          onClick={() => {
            if (page !== dataAll.last_page) setPage(dataAll.last_page);
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </button>
      </div>
      <div className="btn-total mx-4">
        <p>
          {dataAll.from} - {dataAll.to} of {dataAll.total}
        </p>
      </div>
    </div>
  );
}

export default memo(Pagination);

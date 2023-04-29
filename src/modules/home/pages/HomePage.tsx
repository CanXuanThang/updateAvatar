import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="container mt-5">
      <Link to={ROUTES.product}>
        <button type="button" className="btn btn-primary">
          Product
        </button>
      </Link>
      <Link to={ROUTES.profile}>
        <button type="button" className="btn btn-primary mx-5">
          Profile
        </button>
      </Link>
    </div>
  );
};

export default HomePage;

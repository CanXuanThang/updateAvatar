import HeaderContent from './layouts/header/HeaderContent';
import Table from './layouts/table/Table';
import Home from '../home/Home';
import { useSelector } from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import Footer from './layouts/footer/Footer';

function EmployeeManagement() {
  const path = useSelector((state: any) => state.employee.title);

  return (
    <Home>
      <Toolbar />
      <HeaderContent name={path} bool={true} />
      <Table />
      <Footer />
    </Home>
  );
}

export default EmployeeManagement;

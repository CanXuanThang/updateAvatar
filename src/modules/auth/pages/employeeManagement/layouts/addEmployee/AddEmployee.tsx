import Home from '../../../home/Home';
import HeaderContent from '../header/HeaderContent';
import Option from '../options/Option';
import Toolbar from '@mui/material/Toolbar';

function AddEmployee() {
  return (
    <Home>
      <Toolbar />
      <HeaderContent name="Employee Management" bool={false} />
      <Option />
    </Home>
  );
}

export default AddEmployee;

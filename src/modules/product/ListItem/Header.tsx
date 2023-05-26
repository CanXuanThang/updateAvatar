import { SpaceBar } from '@mui/icons-material';
import { Button } from '@mui/material';

function Header() {
  return (
    <div className="d-flex justify-content-between">
      <h2>Payroll Transactions List</h2>
      <SpaceBar>
        <Button>Export CSV </Button>
      </SpaceBar>
    </div>
  );
}

export default Header;

import { Button, Space } from 'antd';

function Header() {
  return (
    <div className="d-flex justify-content-between">
      <h2>Payroll Transactions List</h2>
      <Space wrap>
        <Button type="primary">Export CSV </Button>
      </Space>
    </div>
  );
}

export default Header;

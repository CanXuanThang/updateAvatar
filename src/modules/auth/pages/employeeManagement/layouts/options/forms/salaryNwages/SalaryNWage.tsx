import HeaderForm from '../HeaderForm';
import SalaryNWageForm from './SalaryNWageForm';

interface Props {
  bool?: boolean;
}

function SalaryNWage({ bool }: Props) {
  return (
    <HeaderForm title="Salary & Wages" bool={bool}>
      <SalaryNWageForm />
    </HeaderForm>
  );
}

export default SalaryNWage;

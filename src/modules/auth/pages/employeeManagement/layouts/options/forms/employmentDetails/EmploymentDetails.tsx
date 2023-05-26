import HeaderForm from '../HeaderForm';
import EmploymentDetailsForm from './EmploymentDetailsForm';

interface Props {
  bool?: boolean;
}

function EmploymentDetails({ bool }: Props) {
  return (
    <HeaderForm title="Employment Details" bool={bool}>
      <EmploymentDetailsForm />
    </HeaderForm>
  );
}

export default EmploymentDetails;

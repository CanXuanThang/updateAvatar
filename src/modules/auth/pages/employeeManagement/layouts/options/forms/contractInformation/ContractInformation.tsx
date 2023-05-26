import HeaderForm from '../HeaderForm';
import ContractInformationForm from './ContractInformationForm';

interface Props {
  bool?: boolean;
}

function ContractInformation({ bool }: Props) {
  return (
    <HeaderForm title="Contract Information" bool={bool}>
      <ContractInformationForm />
    </HeaderForm>
  );
}

export default ContractInformation;

import PersonalInformationForm from './PersonalInformationForm';
import HeaderForm from '../HeaderForm';

interface Props {
  bool?: boolean;
}

function PersonalInformation({ bool }: Props) {
  return (
    <HeaderForm title="Personal Information" bool={bool}>
      <PersonalInformationForm />
    </HeaderForm>
  );
}

export default PersonalInformation;

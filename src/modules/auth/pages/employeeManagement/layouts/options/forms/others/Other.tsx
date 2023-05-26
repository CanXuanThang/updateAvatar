import HeaderForm from '../HeaderForm';
import OtherForm from './OtherForm';
import Document from './Document';

interface Props {
  bool?: boolean;
}

function Other({ bool }: Props) {
  return (
    <HeaderForm title="Others" bool={bool}>
      <OtherForm />
      <Document />
    </HeaderForm>
  );
}

export default Other;

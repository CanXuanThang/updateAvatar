import { Box } from '@mui/material';
import { FormEvent, memo, useEffect, useState } from 'react';
import InfoForm2 from './infoForm/InfoForm2';
import InfoForm1 from './infoForm/InfoForm1';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setPersonalInformationForm } from '../../../../../../redux/employeeReducer';

function PersonalInformationForm() {
  const hanldeSunmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [dataForm1, setDataForm1] = useState();
  const [dataForm2, setDataForm2] = useState();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const merged = Object.assign({}, dataForm1, dataForm2);

  useEffect(() => {
    dispatch(setPersonalInformationForm(merged));
  }, [dispatch, merged]);

  return (
    <Box
      component="form"
      onSubmit={hanldeSunmit}
      sx={{ gap: '40px', display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}
    >
      <InfoForm1 dataForm={setDataForm1} />
      <InfoForm2 dataForm={setDataForm2} />
    </Box>
  );
}

export default memo(PersonalInformationForm);

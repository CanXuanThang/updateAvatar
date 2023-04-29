import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ILocationParams, ISignUpParams } from '../../../models/singup';
import { setLocale } from '../../intl/redux/intlReducer';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

interface Props {
  onSignUp(values: ISignUpParams): void;
  loading: boolean;
  errorMessage: string;
  locations: Array<ILocationParams>;
  states: Array<ILocationParams>;
  onChangeRegion(idRegion: string): void;
}

function SignUpForm(props: Props) {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { onSignUp, loading, errorMessage, locations, states, onChangeRegion } = props;
  const [showCityField, setShowCityField] = useState(false);
  const [tran, setTran] = useState('en');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignUpParams>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
      name: '',
      gender: '',
      region: '',
      state: '',
    },
  });

  const options = [
    {
      label: 'Nam',
      value: 'male',
    },
    {
      label: 'Nữ',
      value: 'female',
    },
    {
      label: 'Bede',
      value: 'bede',
    },
  ];

  useEffect(() => {
    const password = watch('password');
    const repeatPassword = watch('repeatPassword');
    const region = watch('region');
    if (password && repeatPassword) {
      setPasswordMatch(password === repeatPassword);
    }
    onChangeRegion(region);

    if (region) {
      setShowCityField(true);
    }
  }, [watch('password'), watch('repeatPassword'), watch('region')]);

  const onSubmit: SubmitHandler<ISignUpParams> = (data) => onSignUp(data);

  const dispatch = useDispatch();
  const changeLang = () => {
    if (tran === 'en') {
      dispatch(setLocale('vi'));
      setTran('vi');
    } else if (tran === 'vi') {
      dispatch(setLocale('en'));
      setTran('en');
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="row g-3 needs-validation"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div onClick={changeLang} className="border d-flex justify-content-center" style={{ cursor: 'pointer' }}>
        Transalate
      </div>
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <div className="d-flex flex-column">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          }}
          render={({ field }) => <input {...field} type="text" id="email" />}
        />
        <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
          {errors.email?.type === 'required' && <FormattedMessage id="emailRequire" />}
          {errors.email?.type === 'pattern' && <FormattedMessage id="emailInvalid" />}
        </span>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="password" />
        </label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            minLength: 4,
          }}
          render={({ field }) => <input {...field} type="password" id="password" />}
        />
        <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
          {errors.password?.type === 'required' && <FormattedMessage id="passwordRequire" />}
          {errors.password?.type === 'minLength' && <FormattedMessage id="minPasswordInvalid" />}
        </span>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="repeatPassword" />
        </label>
        <Controller
          name="repeatPassword"
          control={control}
          rules={{
            required: true,
            validate: (value) => value === watch('password'),
          }}
          render={({ field }) => <input {...field} type="password" id="repeatPassword" />}
        />
        <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
          {errors.repeatPassword?.type === 'required' && <FormattedMessage id="passwordRequire" />}
          {errors.repeatPassword?.type === 'validate' ||
            (!passwordMatch && <FormattedMessage id="matchPasswordInvalid" />)}
        </span>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="name" />
        </label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => <input {...field} type="text " id="name" />}
        />
        <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
          {errors.name?.type === 'required' && <FormattedMessage id="nameRequire" />}
        </span>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="gender" />
        </label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <select onChange={onChange} value={value}>
              <option>-- Vui lòng chọn giới tính --</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
        <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
          {errors.gender?.type === 'required' && <FormattedMessage id="genderRequire" />}
        </span>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="region" />
        </label>
        <Controller
          name="region"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <select onChange={onChange} value={value}>
              <option>-- Vui lòng chọn quốc gia --</option>
              {locations.map((location: ILocationParams, index: number) => (
                <option key={location.id} value={index + 1}>
                  {location.name}
                </option>
              ))}
            </select>
          )}
        />
        <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
          {errors.region?.type === 'required' && <FormattedMessage id="regionRequire" />}
        </span>
      </div>
      {showCityField && (
        <div className="d-flex flex-column">
          <label htmlFor="inputEmail" className="form-label">
            <FormattedMessage id="state" />
          </label>
          <Controller
            name="state"
            control={control}
            rules={{ required: 'Vui lòng chọn quốc gia' }}
            render={({ field: { onChange, value } }) => (
              <select onChange={onChange} value={value}>
                {states.map((state: ILocationParams, index: number) => (
                  <option key={state.id} value={index}>
                    {state.name}
                  </option>
                ))}
              </select>
            )}
          />
          <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
            {errors.state?.type === 'required' && <FormattedMessage id="stateRequire" />}
          </span>
        </div>
      )}
      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto d-flex">
          <button
            className="btn btn-primary me-3"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <label htmlFor="inputEmail" className="form-label">
              <FormattedMessage id="register" />
            </label>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;

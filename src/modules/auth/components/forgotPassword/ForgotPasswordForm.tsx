import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ForgorPasswordParams, ILoginParams } from '../../../../models/auth';
import { FormattedMessage } from 'react-intl';
import './ForgotPasswordForm.scss';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../../configs/routes';

interface Props {
  onLogin(values: ForgorPasswordParams): void;
  loading: boolean;
  errorMessage: string;
}

function ForgotPasswordForm(props: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const { onLogin, loading, errorMessage } = props;

  const onSubmit: SubmitHandler<ForgorPasswordParams> = (data) => onLogin(data);

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const handlePage = () => {
    dispatch(replace(ROUTES.login));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="row g-3 needs-validation d-flex justify-content-center"
      style={{ maxWidth: '560px', width: '100%', marginTop: '80px', marginBottom: '55px' }}
    >
      <h3 className="title">Forgot password</h3>
      <div className="forgot">
        <div className="d-flex flex-column">
          <label htmlFor="inputEmail" className="form-label" style={{ fontWeight: 500 }}>
            <FormattedMessage id="emailForgot" />
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            }}
            render={({ field }) => <input {...field} type="text" id="email" className="form-control ip" />}
          />
          <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
            {errors.email?.type === 'required' && <FormattedMessage id="emailRequire" />}
            {errors.email?.type === 'pattern' && <FormattedMessage id="emailInvalid" />}
          </span>
        </div>
        <div className="row justify-content-md-center" style={{ margin: '12px 0 12px 0' }}>
          <div className="col-md-auto" style={{ width: '100%', padding: 0 }}>
            <button
              className="btn btn-lg css-btn"
              type="submit"
              style={{
                width: '100%',
                fontSize: 16,
                padding: 12,
                background: '#0091ff',
                color: '#fff',
              }}
              disabled={loading}
            >
              {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
              <FormattedMessage id="register" />
            </button>
          </div>
        </div>
        <div onClick={handlePage}>
          <span
            className="d-flex justify-content-center sign-inn"
            style={{ cursor: 'pointer', color: '#0091FF', fontSize: 14 }}
          >
            Back to Sign In
          </span>
        </div>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;

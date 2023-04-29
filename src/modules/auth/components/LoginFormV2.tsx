import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ILoginParams } from '../../../models/auth';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

export default function LoginFormV2(props: Props) {
  const { onLogin, loading, errorMessage } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginParams>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  const onSubmit: SubmitHandler<ILoginParams> = (data) => onLogin(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Vui lòng nhập email',
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Định dạng email không đúng',
          },
        }}
        render={({ field }) => <input {...field} type="text" id="email" />}
      />
      {errors.email && <span className="text-danger">{errors.email.message}</span>}
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Vui lòng nhập mật khẩu',
          minLength: {
            value: 4,
            message: 'Mật khẩu tối thiểu 4 ký tự',
          },
        }}
        render={({ field }) => <input {...field} type="password" id="password" />}
      />
      {errors.password && <span className="text-danger">{errors.password.message}</span>}
      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => (
          <div>
            <input type="checkbox" {...field} value={field.value ? 'true' : 'false'} />
            <label>Remember me</label>
          </div>
        )}
      />
      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto d-flex">
          <button
            className="btn btn-primary me-3"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />} Login
          </button>
        </div>
      </div>
    </form>
  );
}

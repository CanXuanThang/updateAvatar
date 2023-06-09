import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }
  return '';
}

export const API_PATHS = {
  signIn: `${APIHost}/login`,
  forgotPassword: `${APIHost}/forgot-password`,
  employee: `${APIHost}/employee`,
  deleteEmployee: `${APIHost}/employee/multiple-delete`,
  getBenefit: `${APIHost}/benefit?grade_id=undefined`,
  getGrade: `${APIHost}/grade`,

  signUp: `${getBaseUrl(APIService.auth)}/register`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  getLocation: `${getBaseUrl(APIService.public)}/location`,
  getProduct: `${getBaseUrl(APIService.public)}/product`,
  updateProduct: `${getBaseUrl(APIService.public)}/product`,
};

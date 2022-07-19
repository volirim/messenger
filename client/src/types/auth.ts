const AUTH = 'auth';

export const authURLs = {
  AUTH_REGISTER: `${AUTH}/register`,
  AUTH_LOGIN: `${AUTH}/login`,
};

export interface IAuth {
    username: string;
    password: string;
}

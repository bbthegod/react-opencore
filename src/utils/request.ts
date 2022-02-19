import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from 'constants/config';
import { decrypt } from 'hook/useAuth';

const instance = axios.create({ baseURL: BASE_URL });
const auth = decrypt();

instance.interceptors.request.use(
  config => {
    if (auth)
      config.headers = {
        Authorization: `Bearer ${auth.token}`,
      };
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

function parseJSON(response: AxiosResponse) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

export async function request(payload) {
  try {
    const response = await instance(payload);
    return { response: parseJSON(response), error: undefined };
  } catch (error) {
    return { response: undefined, error };
  }
}

import axios, { AxiosResponse } from 'axios';
export class ResponseError extends Error {
  public response: AxiosResponse;

  constructor(response: AxiosResponse) {
    super(response.statusText);
    this.response = response;
  }
}

function parseJSON(response: AxiosResponse) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

function checkStatus(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

export async function request(payload) {
  const instance = axios.create();
  const fetchResponse = await instance(payload);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

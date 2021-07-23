import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config } from '../Config';
import { authenticationInterceptor } from '../interceptors';

export class Service {
  service: AxiosInstance;

  constructor() {
    this.service = axios.create({ baseURL: Config.url });
    this.service.interceptors.request.use(authenticationInterceptor);
  }

  async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    const response = await this.service.request(config);

    return response;
  }
}

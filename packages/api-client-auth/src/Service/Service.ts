import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config } from '../Config';
import { authenticationInterceptor } from '../interceptors';

export class Service {
  private readonly _api: AxiosInstance;

  private static instance: Service;

  private constructor() {
    const config = Config.getInstance();

    this._api = axios.create({ baseURL: config.url });
    this._api.interceptors.request.use(authenticationInterceptor);
  }

  static getInstance() {
    if (!Service.instance) {
      Service.instance = new Service();
    }

    return Service.instance;
  }

  get api() {
    return this._api;
  }

  static async request<T>(
    resource: string,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const { api } = Service.getInstance();
    const { url, ...restConfig } = config;

    const response = await api.request({
      url: url ? `${resource}/${url}` : resource,
      ...restConfig,
    });

    return response;
  }
}

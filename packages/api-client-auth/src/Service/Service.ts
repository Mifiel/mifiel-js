import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Config } from '../Config';
import { hmacAuthInterceptor } from '../interceptors';
import { headers } from '../headers';

export class Service {
  private readonly _api: AxiosInstance;

  private static instance: Service;

  private constructor() {
    this._api = axios.create({ baseURL: Config.url });

    Object.assign(this._api.defaults.headers.common, headers);
    this._api.interceptors.request.use(hmacAuthInterceptor);
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
  ): Promise<T> {
    const { api } = Service.getInstance();
    const { url, ...restConfig } = config;

    api.defaults.baseURL = Config.url;

    try {
      const { data } = await api.request({
        url: url ? `${resource}/${url}` : resource,
        ...restConfig,
      });

      return data;
    } catch (error: any) {
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        const { status, statusText, data } = axiosError.response;
        const dataObject =
          data !== null && typeof data === 'object' ? data : {};
        // API consumers expect a plain error-shaped object (legacy contract).
        // eslint-disable-next-line @typescript-eslint/no-throw-literal -- preserve thrown payload shape
        throw {
          status_code: status,
          status_message: statusText,
          message: axiosError.message,
          ...dataObject,
        };
      }

      throw error;
    }
  }
}

import type { AxiosRequestConfig } from 'axios';
import { Service } from '@mifiel/api-client-auth';

export abstract class Model {
  static resource: string;

  static async find<Entity>(id: string, config?: AxiosRequestConfig) {
    const { data } = await Service.request<Entity>(this.resource, {
      method: 'GET',
      url: id,
      ...config,
    });

    return data;
  }

  static async all<Entity>(config?: AxiosRequestConfig) {
    const { data } = await Service.request<Entity[]>(this.resource, {
      method: 'GET',
      ...config,
    });

    return data;
  }

  static async delete<Entity>(id: string, config?: AxiosRequestConfig) {
    const { data } = await Service.request<Entity>(this.resource, {
      method: 'DELETE',
      url: id,
      ...config,
    });

    return data;
  }

  static async create<Entity>(body: Object, config?: AxiosRequestConfig) {
    const { data } = await Service.request<Entity>(this.resource, {
      method: 'POST',
      data: body,
      ...config,
    });

    return data;
  }

  static async update<Entity>(
    id: string,
    body: Object,
    config?: AxiosRequestConfig
  ) {
    const { data } = await Service.request<Entity>(this.resource, {
      method: 'PATCH',
      url: id,
      data: body,
      ...config,
    });

    return data;
  }
}

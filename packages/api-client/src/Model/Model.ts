import { z } from 'zod';
import type { AxiosRequestConfig } from 'axios';
import { Service } from '@mifiel/api-client-auth';

const modelIdSchema = z.string();

export class Model<Entity> {
  private readonly _resource: string;

  constructor(resource: string) {
    this._resource = resource;
  }

  async find(id: string, config?: AxiosRequestConfig) {
    modelIdSchema.parse(id);

    const { data } = await Service.request<Entity>(this._resource, {
      method: 'GET',
      url: id,
      ...config,
    });

    return data;
  }

  async all(config?: AxiosRequestConfig) {
    const { data } = await Service.request<Entity[]>(this._resource, {
      method: 'GET',
      ...config,
    });

    return data;
  }

  async delete(id: string, config?: AxiosRequestConfig) {
    modelIdSchema.parse(id);

    const { data } = await Service.request<Entity>(this._resource, {
      method: 'DELETE',
      url: id,
      ...config,
    });

    return data;
  }

  async create(body: Object, config?: AxiosRequestConfig) {
    const { data } = await Service.request<Entity>(this._resource, {
      method: 'POST',
      data: body,
      ...config,
    });

    return data;
  }

  async update(id: string, body: Object, config?: AxiosRequestConfig) {
    modelIdSchema.parse(id);

    const { data } = await Service.request<Entity>(this._resource, {
      method: 'PATCH',
      url: id,
      data: body,
      ...config,
    });

    return data;
  }

  async request<Response>(config: AxiosRequestConfig) {
    return Service.request<Response>(this._resource, config);
  }
}

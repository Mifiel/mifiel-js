import { Service } from '@mifiel/api-client-auth';
import type { UserResponse } from '@mifiel/models';
import { setupWidgetSchema, SetupWidgetSchema } from './user.types';

export class UserModel {
  private readonly _resource = 'users';

  async me() {
    return Service.request<UserResponse>(this._resource, {
      method: 'GET',
      url: 'me',
    });
  }

  async setupWidget(params: SetupWidgetSchema) {
    setupWidgetSchema.parse(params);

    return Service.request<{ widget_id: string }>(this._resource, {
      method: 'POST',
      url: 'setup-widget',
      data: params,
    });
  }
}

export const User = new UserModel();

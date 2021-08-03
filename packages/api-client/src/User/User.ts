import { Service } from '@mifiel/api-client-auth';
import type { UserResponse } from '@mifiel/models';
import { setupWidgetSchema, SetupWidgetSchema } from './user.types';

export abstract class User {
  private static resource = 'users';

  static async me() {
    return Service.request<UserResponse>(this.resource, {
      method: 'GET',
      url: 'me',
    });
  }

  static async setupWidget(params: SetupWidgetSchema) {
    setupWidgetSchema.parse(params);

    return Service.request<{ widget_id: string }>(this.resource, {
      method: 'POST',
      url: 'setup-widget',
      data: params,
    });
  }
}

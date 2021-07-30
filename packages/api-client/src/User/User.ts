import { Service } from '@mifiel/api-client-auth';
import type { UserResponse } from '@mifiel/models';

export abstract class User {
  private static resource = 'users';

  static async me() {
    return Service.request<UserResponse>(this.resource, {
      method: 'GET',
      url: 'me',
    });
  }

  static setupWidget(params: {
    email: string;
    tax_id?: string;
    callback_url?: string;
  }) {
    return Service.request<{ widget_id: string }>(this.resource, {
      method: 'POST',
      url: 'setup-widget',
      data: params,
    });
  }
}

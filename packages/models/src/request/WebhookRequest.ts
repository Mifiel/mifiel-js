import type { WebhookCallbackType } from '../response/WebhookResponse';

export type WebhookRequest = {
  url: string;
  callback_type: WebhookCallbackType;
};

export type TriggerWebhookRequest = {
  resource: string;
  instant?: boolean;
};

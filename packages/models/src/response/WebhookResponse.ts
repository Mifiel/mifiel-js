export type WebhookCallbackType =
  | 'document_closed'
  | 'signer_completed'
  | 'signer_rejected'
  | 'document_deleted';

export type WebhookResponse = {
  id?: string;
  url?: string;
  callback_type?: WebhookCallbackType;
  created_at?: string;
};

/** Result of an immediate webhook delivery (`instant: true`, HTTP 200). */
export type InstantTriggerWebhookResponse = {
  status: 'success' | 'error';
  errors?: string;
  request: {
    url: string;
    body: Record<string, unknown>;
  };
  response: {
    status_code: number;
    headers: Record<string, unknown>;
    body: string;
  };
};

/** Confirmation that a recurring delivery task was enqueued (HTTP 202). */
export type QueuedTriggerWebhookResponse = {
  status: 'success';
};

export type TriggerWebhookResponse =
  InstantTriggerWebhookResponse | QueuedTriggerWebhookResponse;

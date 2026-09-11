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

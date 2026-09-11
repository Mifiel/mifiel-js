import type {
  TriggerWebhookRequest,
  WebhookRequest,
  WebhookResponse,
} from '@mifiel/models';
import { z } from 'zod';

import { Model } from '../Model';

const createWebhookSchema = z.object({
  url: z.string().url(),
  callback_type: z.enum([
    'document_closed',
    'signer_completed',
    'signer_rejected',
    'document_deleted',
  ]),
});

const triggerWebhookSchema = z.object({
  id: z.string().min(1),
  resource: z.string().min(1),
  instant: z.boolean().optional(),
});

/**
 * Account-level webhook subscriptions.
 * @see https://docs.mifiel.com/en/#tag/Webhooks
 */
class WebhookModel extends Model<WebhookResponse> {
  constructor() {
    super('webhooks');
  }

  async create(params: WebhookRequest) {
    createWebhookSchema.parse(params);
    return super.create(params);
  }

  async trigger(params: { id: string } & TriggerWebhookRequest) {
    const { id, ...body } = triggerWebhookSchema.parse(params);
    return this.request({
      method: 'POST',
      url: `${id}/trigger`,
      data: {
        resource: body.resource,
        instant: body.instant ?? false,
      },
    });
  }
}

export const Webhook = new WebhookModel();

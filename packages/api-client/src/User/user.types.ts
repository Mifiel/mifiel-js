import { z } from 'zod';

export const setupWidgetSchema = z.object({
  email: z.string(),
  tax_id: z.string().optional(),
  callback_url: z.string().optional(),
});

export type SetupWidgetSchema = z.infer<typeof setupWidgetSchema>;

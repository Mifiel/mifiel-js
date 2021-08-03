import { z } from 'zod';

export const getFileSchema = z.object({
  documentId: z.string(),
  type: z.literal('file').or(z.literal('file_signed')).or(z.literal('xml')),
});

export type GetFileSchema = z.infer<typeof getFileSchema>;

export const saveFileSchema = z
  .object({
    path: z.string().nonempty(),
  })
  .merge(getFileSchema);

export type SaveFileSchema = z.infer<typeof saveFileSchema>;

// NOTE: we don't generate type, in order to make transfer param flexible

export const transferDocumentSchema = z.object({
  documentId: z.string(),
  callback_url: z.string().optional(),
  receiver: z.object({
    email: z.string(),
    tax_id: z.string().optional(),
    asset_key: z.string().optional(),
  }),
  signatories: z.record(z.any()).array(),
});

// NOTE: we don't generate type, in order to make createDocument param flexible
export const createDocumentSchema = z.record(z.any());

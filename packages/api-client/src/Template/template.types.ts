import { z } from 'zod';

export const templateIdSchema = z.object({
  templateId: z.string(),
});

export type TemplateIdSchema = z.infer<typeof templateIdSchema>;

// NOTE: we don't generate type, in order to make document param flexible

export const generateDocumentSchema = z
  .object({
    document: z.record(z.any()),
  })
  .merge(templateIdSchema);

export const generateDocumentOnBulkSchema = z.object({
  identifier: z.string().optional(),
  callback_url: z.string().optional(),
  documents: z.record(z.any()).array(),
});

import { z } from 'zod';

export const createCertificateSchema = z.object({
  filepath: z.string().nonempty(),
});

export type CreateCertificateSchema = z.infer<typeof createCertificateSchema>;

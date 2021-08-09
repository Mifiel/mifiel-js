import { z } from 'zod';

export const configParamsSchema = z.object({
  appId: z.string(),
  appSecret: z.string(),
  env: z
    .literal('production')
    .or(z.literal('sandbox'))
    .or(z.literal('staging'))
    .optional(),
  hmacDigest: z.literal('sha1').or(z.literal('sha256')).optional(),
});

export type ConfigParamsSchema = z.infer<typeof configParamsSchema>;

import { z } from 'zod';

export const configParamsSchema = z.object({
  appId: z.string(),
  appSecret: z.string(),
  env: z
    .literal('production')
    .or(z.literal('sandbox'))
    .or(z.literal('staging'))
    .optional(),
});

export type ConfigParamsSchema = z.infer<typeof configParamsSchema>;

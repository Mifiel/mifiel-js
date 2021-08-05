export type TemplateRequest = Partial<{
  track: boolean;
  type: string;
  name: string;
  description: string;
  header: string;
  content: string;
  footer: string;
}>;

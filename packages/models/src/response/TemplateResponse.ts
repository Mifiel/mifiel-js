export type TemplateResponse = Partial<{
  id: string;
  name: string;
  description: string;
  has_documents: boolean;
  header: string;
  content: string;
  footer: string;
  csv: string;
  tracked: boolean;
  type: string;
}>;

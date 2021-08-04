import type {
  DocumentRequest,
  DocumentResponse,
  TemplateResponse,
} from '@mifiel/models';
import { Model } from '../Model';
import {
  generateDocumentOnBulkSchema,
  generateDocumentSchema,
  templateIdSchema,
  TemplateIdSchema,
} from './template.types';

class TemplateModel extends Model<TemplateResponse> {
  constructor() {
    super('templates');
  }

  async getDocuments(params: TemplateIdSchema) {
    templateIdSchema.parse(params);

    return this.request<TemplateResponse>({
      method: 'GET',
      url: `${params.templateId}/documents`,
    });
  }

  async getFields(params: TemplateIdSchema) {
    templateIdSchema.parse(params);

    return this.request<{ type: string; name: string; value: string }[]>({
      method: 'GET',
      url: `${params.templateId}/fields`,
    });
  }

  async generateDocument(params: {
    templateId: string;
    document: DocumentRequest;
  }) {
    generateDocumentSchema.parse(params);

    return this.request<DocumentResponse>({
      method: 'POST',
      url: `${params.templateId}/generate_document`,
      data: params.document,
    });
  }

  async generateDocuments(params: {
    templateId: string;
    identifier?: string;
    callback_url: string;
    documents: DocumentRequest[];
  }) {
    generateDocumentOnBulkSchema.parse(params);

    const { templateId, ...restParams } = params;

    return this.request<DocumentResponse[]>({
      method: 'POST',
      url: `${templateId}/generate_documents`,
      data: restParams,
    });
  }
}

export const Template = new TemplateModel();

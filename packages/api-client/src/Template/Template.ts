import { Service } from '@mifiel/api-client-auth';
import type {
  DocumentRequest,
  DocumentResponse,
  TemplateRequest,
  TemplateResponse,
} from '@mifiel/models';
import { ModelCrud } from '../ModelCrud';
import {
  generateDocumentOnBulkSchema,
  generateDocumentSchema,
  templateIdSchema,
  TemplateIdSchema,
} from './template.types';

export abstract class Template extends ModelCrud {
  static resource = 'templates';

  static async create<Entity extends TemplateResponse>(
    template: TemplateRequest
  ) {
    return super.create<Entity>(template);
  }

  static async getDocuments(params: TemplateIdSchema) {
    templateIdSchema.parse(params);

    return Service.request<TemplateResponse>(this.resource, {
      method: 'GET',
      url: `${params.templateId}/documents`,
    });
  }

  static async getFields(params: TemplateIdSchema) {
    templateIdSchema.parse(params);

    return Service.request<{ type: string; name: string; value: string }[]>(
      this.resource,
      {
        method: 'GET',
        url: `${params.templateId}/fields`,
      }
    );
  }

  static async generateDocument(params: {
    templateId: string;
    document: DocumentRequest;
  }) {
    generateDocumentSchema.parse(params);

    return Service.request<DocumentResponse>(this.resource, {
      method: 'POST',
      url: `${params.templateId}/generate_document`,
      data: params.document,
    });
  }

  static async generateDocuments(params: {
    templateId: string;
    identifier?: string;
    callback_url?: string;
    documents: DocumentRequest[];
  }) {
    generateDocumentOnBulkSchema.parse(params);

    const { templateId, ...restParams } = params;

    return Service.request<DocumentResponse[]>(this.resource, {
      method: 'POST',
      url: `${templateId}/generate_documents`,
      data: restParams,
    });
  }
}

import { Service } from '@mifiel/api-client-auth';
import type {
  DocumentRequest,
  DocumentResponse,
  TemplateRequest,
  TemplateResponse,
} from '@mifiel/models';
import { Model } from '../Model';

export abstract class Template extends Model {
  static resource = 'templates';

  static async create<Entity extends TemplateResponse>(
    template: TemplateRequest
  ) {
    return super.create<Entity>(template);
  }

  static async getDocuments(params: { templateId: string }) {
    return Service.request<TemplateResponse>(this.resource, {
      method: 'GET',
      url: `${params.templateId}/documents`,
    });
  }

  static async getFields(params: { templateId: string }) {
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
    const { templateId, ...restParams } = params;

    return Service.request<DocumentResponse[]>(this.resource, {
      method: 'POST',
      url: `${templateId}/generate_documents`,
      data: restParams,
    });
  }
}

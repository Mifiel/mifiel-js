import type { DocumentResponse, SignatoryResponse } from '@mifiel/models';
import { Service } from '@mifiel/api-client-auth';

export type DocumentTransferParams = {
  documentId: string;
  // TODO: move to @mifiel/models?
  receiver: {
    email: string;
    tax_id?: string;
    asset_key?: string;
  };
  signatories: SignatoryResponse[];
} & { [key in string]: any };

const resource = 'documents';
export class Document {
  static async transfer(params: DocumentTransferParams) {
    const { documentId, ...restParams } = params;

    return Service.request<DocumentResponse>(resource, {
      method: 'POST',
      url: `${documentId}/transfer`,
      data: restParams,
    });
  }
}

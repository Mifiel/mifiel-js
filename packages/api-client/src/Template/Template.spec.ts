import { Service } from '@mifiel/api-client-auth';
import type { DocumentRequest, TemplateRequest } from '@mifiel/models';

import { Template } from './Template';

describe('Template', () => {
  let requestMock: jest.Mock;
  const templateId = 'some-template-id';
  const document: DocumentRequest = {
    name: 'Mi Client Name',
    signatories: [
      {
        email: 'ezavile@gmail.com',
        name: 'Edgar Zavala',
      },
      {
        email: 'edgar@mifiel.com',
        name: 'Edgar Z',
        tax_id: 'ZAAE9306278TA',
      },
    ],
  };

  beforeEach(() => {
    requestMock = jest.fn(() => ({}));
    jest
      .spyOn(Service.getInstance().api, 'request')
      .mockImplementation(requestMock);
  });

  describe('@create', () => {
    it('sends template data ', async () => {
      const template: TemplateRequest = {
        name: 'my-company-name',
        description: 'Confidential disclosure agreement',
        content: '<div>html content</div>',
      };

      await Template.create(template);

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: 'templates',
          data: template,
        })
      );
    });
  });

  describe('@getDocuments', () => {
    it('sends templates/:id/documents as GET', async () => {
      await Template.getDocuments({ templateId });

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: `templates/${templateId}/documents`,
        })
      );
    });
  });

  describe('@getFields', () => {
    it('sends templates/:id/fields as GET', async () => {
      await Template.getFields({ templateId });

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: `templates/${templateId}/fields`,
        })
      );
    });
  });

  describe('@generateDocument', () => {
    it('sends templates/:id/generate_document with data', async () => {
      await Template.generateDocument({ templateId, document });

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: `templates/${templateId}/generate_document`,
          data: { ...document },
        })
      );
    });
  });

  describe('@generateDocuments', () => {
    it('sends templates/:id/generate_documents with data', async () => {
      await Template.generateDocuments({
        templateId,
        callback_url: 'https://www.mifiel.com',
        documents: [document],
      });

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: `templates/${templateId}/generate_documents`,
          data: {
            callback_url: 'https://www.mifiel.com',
            documents: [document],
          },
        })
      );
    });
  });
});

import type { SigningGroupResponse } from './SigningGroupResponse';
import type { StakeholderResponse } from './StakeholderResponse';

// TODO: check optional and required attributes

export type DocumentResponse = Partial<{
  real_id: string;
  id: string;
  message_for_signers?: string;
  send_mail: boolean;
  original_hash: string;
  signed_hash?: string;
  blockchainized: boolean;
  btc_tx?: string;
  btc_tx_link?: string;
  name?: string;
  signed_by_all: boolean;
  signed: boolean;
  signed_at?: string;
  created_at: string;
  burned_at?: string;
  status: [number, string];
  external_id?: string;
  remind_every: number;
  expires_at?: string;
  days_to_expire?: string;
  created_by: number;
  state: string;
  manual_close: boolean;
  encrypted: boolean;
  allow_business: boolean;
  file_file_name: string;
  archived: boolean;
  krs: boolean;
  owner: {
    id: number;
    email: string;
    name: string;
    is_company: boolean;
  };
  creator: {
    id: number;
    email: string;
    name: string;
    is_company: boolean;
  };
  callback_url?: string;
  sign_callback_url?: string;
  already_signed: {
    id: number;
    email: string;
    name: string;
  }[];
  has_not_signed: {
    id: number;
    email: string;
    name: string;
  }[];
  permissions: {
    delete: boolean;
    close: boolean;
    archive: boolean;
    dearchive: boolean;
    download: boolean;
    transfer: boolean;
    burn: boolean;
    create_signer: boolean;
    create_reviewer: boolean;
    create_signature: boolean;
  };
  file: string;
  file_download: string;
  file_signed: string;
  file_signed_download: string;
  file_zipped: string;
  file_xml: string;
  signers: StakeholderResponse[];
  viewers: StakeholderResponse[];
  signatures: [
    {
      id: string;
      name: string;
      email: string;
      signed: boolean;
      signed_at?: string;
      certificate_number?: string;
      tax_id?: string;
      signature: boolean;
      certificate?: {
        subject: {
          CN: string;
          name: string;
          O: string;
          C: string;
          emailAddress: string;
          x500UniqueIdentifier: string;
          serialNumber: string;
        };
        issuer: {
          C: string;
          O: string;
          CN: string;
          emailAddress: string;
        };
      };
      user?: {
        id: number;
        email: string;
        name: string;
      };
    }
  ];
  signing_groups: SigningGroupResponse[];
}>;

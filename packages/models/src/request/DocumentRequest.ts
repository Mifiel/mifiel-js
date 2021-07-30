import type { SigningGroupResponse, StakeholderResponse } from '../response';

// TODO: check optional and required attributes
export type DocumentRequest = Partial<{
  created_by: number;
  days_to_expire: number;
  track: boolean;
  type: string;
  user: string;
  callback_url: string;
  encrypted: boolean;
  external_id: string;
  file: string;
  folio: string;
  manual_close: boolean;
  message_for_signers: string;
  name: string;
  original_hash: string;
  remind_every: number;
  send_invites: boolean;
  send_mail: boolean;
  sign_callback_url: string;
  signatories: StakeholderResponse[];
  signing_groups: SigningGroupResponse[];
  stakeholders: StakeholderResponse[];
  template_id: number;
  viewers: {
    email: StakeholderResponse['email'];
    e2ee: StakeholderResponse['e2ee'];
    name: StakeholderResponse['name'];
    tax_id: StakeholderResponse['tax_id'];
  }[];
}>;

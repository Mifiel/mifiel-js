import type { CertificateResponse } from './CertificateResponse';

// TODO: check optional and required attributes

export type StakeholderResponse = Partial<{
  id: string;
  name: string;
  email: string;
  tax_id: string;
  role: string;
  // @deprecated
  type: string;
  field: string;
  signed: boolean;
  widget_id: string;
  current: boolean;
  last_reminded_at: string;
  features: { tax_id_validation: boolean };
  customizations: { show_tos: boolean; show_tutorial: boolean };
  sat_auth: boolean;
  e2ee?: {
    group: {
      e_user: {
        e_pass: string;
        pub: string;
        key_alg: string;
        e_pass_alg: string;
        path?: string;
      };
    };
  };
  certificate?: CertificateResponse;
  hidden?: boolean;
  signing_group: string;
  certificate_number: string;
}>;

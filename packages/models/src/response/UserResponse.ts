export type UserResponse = Partial<{
  id: number | string;
  unique_token: string;
  tax_id: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  to_charge: {
    current_plan: {
      id: string;
      title: string;
      code: string;
      products: {
        document: { granted: number; used: number; available: number };
      };
    };
    billing_cycle: {
      from: string;
      to: string;
      granted_documents: number;
      signed_documents: number;
      pending_documents: number;
      available_documents: number;
    };
    full_billing_cycle: {
      from: string;
      to: string;
    };
  };
  confirmed: boolean;
  has_documents: boolean;
  has_certificates: boolean;
  last_signature_requested_at: string;
  last_signed_at: string;
  logo_path: string;
  sign_in_count: number;
  allow_business_signing: boolean;
  allow_sign_only_hash: boolean;
  show_endorsables: boolean;
  show_companies: boolean;
  show_frontend_tax_id_filter: boolean;
  aliases: string[];
  emails: string[];
  mkms_id: string;
  jwt: string;
}>;

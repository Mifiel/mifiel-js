export interface CertificateResponse {
  id: string;
  certificate_number: string;
  type_of: string;
  cer_hex: string;
  backup_cer: string;
  backup_certificate_number: string;
  owner: string;
  tax_id: string;
  expired: boolean;
  revoked_at: string;
  expires_at: string;
  revoked: boolean;
  has_addresses: boolean;
  days_to_expire: number;
}

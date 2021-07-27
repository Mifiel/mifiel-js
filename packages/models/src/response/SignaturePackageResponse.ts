import type { CertificateResponse } from './CertificateResponse';
import type { DocumentResponse } from './DocumentResponse';

export interface SignaturePackageItemResponse {
  text: string;
  signature?: string;
  metadata?: {
    serialized_address?: string;
    inputs?: { address_index: string; redeem_script: string }[];
  };
}

export interface SignaturePackagePlaintextResponse {
  name:
    | 'doc'
    | 'poses'
    | 'sat-auth'
    | 'sat_auth_credentials'
    | 'sat_auth_request'
    | 'sat_auth_download';
  alg: 'RSA-SHA256' | 'RSA-SHA1' | 'SIMPLE' | 'BITCOIN-HDW' | 'BITCOIN-TX';
  status: 'pending' | 'completed' | 'blocked' | 'deleted';
  widget_id: string;
  entity_keys?: {
    doc?: string;
    key?: string;
  };
  plaintext: SignaturePackageItemResponse[];
}

export interface SignaturePackageResponse {
  status: 'pending' | 'completed';
  signer_count: number;
  plaintext_count: number;
  settings?: {
    widget_version: 1 | 2;
    use_signature_package: boolean;
    on_singing_page: {
      [key in string]: {
        show: boolean;
      };
    };
  };
  entities?: {
    [key in string]: Partial<DocumentResponse | CertificateResponse>;
  };
  certificates: {
    hex: CertificateResponse['cer_hex'];
    serial_number: CertificateResponse['certificate_number'];
  }[];
  plaintexts: SignaturePackagePlaintextResponse[];
}

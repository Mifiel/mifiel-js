import type { StakeholderResponse } from './StakeholderResponse';

export interface SigningGroupResponse {
  name: string;
  priority: number;
  state: string;
  deleted_at?: string;
  constraints: { signer: boolean; reviewer: boolean };
  id: string;
  stakeholders: StakeholderResponse[];
}

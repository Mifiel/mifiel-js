import type { StakeholderResponse } from './StakeholderResponse';

// TODO: check optional and required attributes

export type SigningGroupResponse = Partial<{
  name: string;
  priority: number;
  state: string;
  deleted_at?: string;
  constraints: { signer: boolean; reviewer: boolean };
  id: string;
  stakeholders: StakeholderResponse[];
}>;

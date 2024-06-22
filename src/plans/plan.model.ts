export default interface Plan {
  id: string;
  name: string;
  userId: string;
  status: PlanStatus;
}

export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  LEGACY = 'LEGACY',
}

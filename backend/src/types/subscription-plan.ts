export interface ISubscriptionPlan {
  id: string; // UUID
  name: string; // UUID as string
  description: string;
  price: number; // DECIMAL(10,2) -> use number in TS
  creditPoints: number;
  billing_cycle_days: number;
  isActive: boolean;
  url:string
}

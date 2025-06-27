export type PlanOutput = {
  id: string;
  name: string;
  photoLimit: number;
  storageLimitMb: number;
  events: number;
  price: number;
  duration: number;
  createdAt?: Date;
  updatedAt?: Date;
};

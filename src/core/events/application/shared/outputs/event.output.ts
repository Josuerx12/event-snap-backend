import { UserOutput } from '../../../../user/application/outputs/user.output';

export type EventOutput = {
  id: string;
  logo?: string;
  name: string;
  description: string;
  eventDate: Date;
  publicToken: string;
  photos?: any[];
  user?: UserOutput;
  createdAt?: Date;
  updatedAt?: Date;
};

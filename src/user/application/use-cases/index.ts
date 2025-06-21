import { CreateUserUseCase } from './create-user.use-case';
import { GetLoggedUseCase } from './get-logged.use-case';
import { UpdateUserUseCase } from './update-user.use-case';

export const UserUseCases = [
  CreateUserUseCase,
  GetLoggedUseCase,
  UpdateUserUseCase,
];

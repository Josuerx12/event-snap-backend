import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './domain/dto/create-user.dto';
import { UpdateUserDto } from './domain/dto/update-user.dto';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { GetLoggedUseCase } from './application/use-cases/get-logged.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getLoggedUseCase: GetLoggedUseCase,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  update(updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(updateUserDto);
  }

  getLogged() {
    return this.getLoggedUseCase.execute();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

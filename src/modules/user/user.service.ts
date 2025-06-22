import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../../core/user/application/use-cases/create-user.use-case';
import { GetLoggedUseCase } from '../../core/user/application/use-cases/get-logged.use-case';
import { UpdateUserUseCase } from '../../core/user/application/use-cases/update-user.use-case';
import { CreateUserDto } from '../../core/user/domain/dto/create-user.dto';
import { UpdateUserDto } from '../../core/user/domain/dto/update-user.dto';

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

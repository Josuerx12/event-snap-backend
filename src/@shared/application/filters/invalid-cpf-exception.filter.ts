import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { InvalidCpfError } from '../../arq/value-objects/cpf.vo';

@Catch(InvalidCpfError)
export class InvalidCpfExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidCpfError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: exception.message,
    });
  }
}

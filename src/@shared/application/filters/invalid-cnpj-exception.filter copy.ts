import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { InvalidCnpjError } from '../../domain/value-objects/cnpj.vo';

@Catch(InvalidCnpjError)
export class InvalidCnpjExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidCnpjError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: exception.message,
    });
  }
}

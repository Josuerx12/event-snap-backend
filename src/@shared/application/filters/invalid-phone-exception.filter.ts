import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { InvalidPhoneError } from '../../domain/value-objects/phone.vo';

@Catch(InvalidPhoneError)
export class InvalidPhoneExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidPhoneError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: exception.message,
    });
  }
}

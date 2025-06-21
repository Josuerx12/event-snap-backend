import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse['message'] &&
      Array.isArray(exceptionResponse['message'])
    ) {
      const rawErrors = exceptionResponse['message'];
      const errorsObj = {};

      rawErrors.forEach((msg: string) => {
        const match = msg.match(/^([^. ]+)[\s\S]*$/);
        if (match) {
          const field = match[1];
          if (!errorsObj[field]) {
            errorsObj[field] = [];
          }
          errorsObj[field].push(msg);
        }
      });

      return response.status(status).json({
        message: 'Dados inválidos.',
        errors: errorsObj,
        statusCode: status,
      });
    }

    return response.status(status).json({
      message: exception.message || 'Erro desconhecido.',
      statusCode: status,
    });
  }
}

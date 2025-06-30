import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './@shared/application/filters/validation-exception.filter';
import { InvalidPhoneExceptionFilter } from './@shared/application/filters/invalid-phone-exception.filter';
import { InvalidCpfExceptionFilter } from './@shared/application/filters/invalid-cpf-exception.filter';
import { InvalidCnpjExceptionFilter } from './@shared/application/filters/invalid-cnpj-exception.filter copy';
import { useContainer, ValidationError } from 'class-validator';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const recursiveReduce = (accumulator: object, error: any) => {
          if (error.children && error.children.length > 0) {
            return error.children.reduce(recursiveReduce, accumulator);
          }

          if (error.property in accumulator) {
            if (
              error.constraints &&
              Object.keys(error.constraints).length > 0
            ) {
              accumulator[error.property].push(
                error.constraints[Object.keys(error.constraints)[0]],
              );
            }
          } else {
            if (
              error.constraints &&
              Object.keys(error.constraints).length > 0
            ) {
              accumulator[error.property] = [
                error.constraints[Object.keys(error.constraints)[0]],
              ];
            }
          }

          return accumulator;
        };

        return new UnprocessableEntityException({
          statusCode: 422,
          type: 'ValidationError',
          message: 'Invalid request body content',
          error: errors.reduce(recursiveReduce, {}),
        });
      },
      validateCustomDecorators: true,
    }),
  );

  app.useGlobalFilters(
    new InvalidPhoneExceptionFilter(),
    new InvalidCpfExceptionFilter(),
    new InvalidCnpjExceptionFilter(),
  );

  const corsConfig: CorsOptions = {
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  };

  app.enableCors(corsConfig);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

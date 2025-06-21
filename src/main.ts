import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './@shared/application/filters/validation-exception.filter';
import { InvalidPhoneExceptionFilter } from './@shared/application/filters/invalid-phone-exception.filter';
import { InvalidCpfExceptionFilter } from './@shared/application/filters/invalid-cpf-exception.filter';
import { InvalidCnpjExceptionFilter } from './@shared/application/filters/invalid-cnpj-exception.filter copy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new InvalidPhoneExceptionFilter(),
    new InvalidCpfExceptionFilter(),
    new InvalidCnpjExceptionFilter(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

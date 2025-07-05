import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Gateway } from './s3.gateway';

@Global()
@Module({
  providers: [
    {
      provide: S3Gateway,
      useFactory: (configService: ConfigService) => {
        return new S3Gateway(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    {
      provide: S3Gateway,
      useFactory: (configService: ConfigService) => {
        return new S3Gateway(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class S3Module {}

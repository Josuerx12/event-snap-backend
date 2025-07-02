import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyInfo } from '../../core/user/domain/entities/company-info.entity';
import { PersonalInfo } from '../../core/user/domain/entities/personal-info.entity';
import { User } from '../../core/user/domain/entities/user.entity';
import { Plan } from '../../core/plans/domain/entities/plan.entity';
import { Subscription } from '../../core/subscription/domain/entities/subscription.entity';
import { Photo } from '../../core/photos/domain/entities/photo.entity';
import { Event } from '../../core/events/domain/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        ssl: configService.get<boolean>('DB_SSL', false),
        synchronize: configService.get<boolean>('DB_SYNC', false),
        logging: configService.get<boolean>('DB_LOGGING', false),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      CompanyInfo,
      PersonalInfo,
      Plan,
      Subscription,
      Photo,
      Event,
    ]),
  ],
})
export class DatabaseModule {}

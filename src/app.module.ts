import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './middlewares/auth-guard/auth-guard';
import { AuthContextMiddleware } from './middlewares/auth-guard/auth-context.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PlanModule } from './modules/plans/plan.module';
import { EventsModule } from './modules/events/events.module';
import { S3Module } from './core/aws/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
      validationSchema: null,
      cache: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PlanModule,
    EventsModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector) => {
        return new AuthGuard(reflector);
      },
      inject: [Reflector],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthContextMiddleware).forRoutes('*');
  }
}

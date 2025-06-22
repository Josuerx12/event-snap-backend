import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { AES, enc } from 'crypto-js';
import { verify } from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import { UserOutput } from '../../user/application/outputs/user.output';
import { User } from '../../user/domain/entities/user.entity';
import { AuthStorage } from '../../@shared/application/auth-storage';

@Injectable()
export class AuthContextMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    await AuthStorage.storage.run({}, async () => {
      const [type, token] = req.headers.authorization?.split(' ') ?? [];

      if (type !== 'Bearer' || !token) return next();

      try {
        const payload = verify(
          token,
          this.configService.get<string>('JWT_SECRET')!,
        ) as any;

        const encryptedUser = payload?.user;
        if (!encryptedUser) return next();

        const bytes = AES.decrypt(
          encryptedUser,
          this.configService.get<string>('ENCRYPT_SECRET')!,
        );

        const decrypted = bytes.toString(enc.Utf8);
        const parsed = JSON.parse(decrypted) as UserOutput;

        const userRepo = this.dataSource.getRepository(User);
        const userEntity = await userRepo.findOne({
          where: { id: parsed.id },
          relations: ['personalInfo', 'companyInfo'],
        });

        if (userEntity) {
          AuthStorage.set({ user: userEntity });
        }
      } catch {
        // silencia o erro, o guard cuidará se necessário
      }

      next();
    });
  }
}

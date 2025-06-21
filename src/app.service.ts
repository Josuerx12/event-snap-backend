import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: 'online',
      message: 'Evento Snap API está em funcionamento.',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}

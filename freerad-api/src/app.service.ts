import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Netcom Plus!\nEl mejor internet!!!';
  }
}

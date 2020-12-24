import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/signIn')
  getHello(): string {
    return this.appService.getHello();
  }
}

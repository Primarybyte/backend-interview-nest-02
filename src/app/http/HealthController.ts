import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  getStatus() {
    return { status: 'healthy' };
  }
}

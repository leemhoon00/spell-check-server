import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private prismaService: PrismaService) {}

  @Get('version')
  async getVersion() {
    return await this.prismaService.version.findFirst();
  }
}

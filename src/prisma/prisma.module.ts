import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  //in this line we give access to the prismaService
  exports: [PrismaService],
})
export class PrismaModule {}

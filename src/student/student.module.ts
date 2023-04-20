import { Module } from '@nestjs/common';
import { UserController } from './student.controller';
import { UserService } from './student.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})

// É usado o padrão Pascal Case
export class UserModule {}

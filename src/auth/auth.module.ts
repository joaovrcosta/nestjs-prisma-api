import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/student/student.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule, //Users

    PrismaModule, //Database

    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

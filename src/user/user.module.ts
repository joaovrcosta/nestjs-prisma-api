import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
  exports: [],
})

// É usado o padrão Pascal Case
export class UserModule {}

import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutDTO } from './dto/update-put-user.dto';
import { UpdatePatchDTO } from './dto/update-patch-user.dto';
import { UserService } from './student.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { email, password }: CreateUserDTO) {
    return this.userService.createNewUser({ email, password });
  }

  @Get()
  async list() {
    return this.userService.listAll();
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    console.log({ id });
    return this.userService.showUniqueUser(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutDTO, @ParamId() id: number) {
    return this.userService.updateUser(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  //what interests me is the "id"
  async deleteItem(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}

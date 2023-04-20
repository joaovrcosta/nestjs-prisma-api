import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutDTO } from './dto/update-put-user.dto';
import { UpdatePatchDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  //create a new user
  async createNewUser({ email, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  //read only a user
  async listAll() {
    return this.prisma.user.findMany();
  }

  async showUniqueUser(id: number) {
    await this.AlreadyExists(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, { email, password }: UpdatePutDTO) {
    await this.AlreadyExists(id);
    if (email === undefined) {
      email = '';
    }

    return this.prisma.user.update({
      data: { email, password },
      where: {
        id,
      },
    });
  }
  async updatePartial(id: number, data: UpdatePatchDTO) {
    await this.AlreadyExists(id);
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: number) {
    await this.AlreadyExists(id);
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async AlreadyExists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`User not exists or incorret id number`);
    }
  }
}

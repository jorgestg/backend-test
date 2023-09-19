import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.model.create({
      _id: new Types.ObjectId(),
      ...createUserDto,
      password: await hash(createUserDto.password, 11),
    });
  }

  findAll(): Promise<User[]> {
    return this.model.find();
  }

  findById(id: string): Promise<User | undefined> {
    return this.model.findById(id);
  }

  async findByCredentials(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.model.findOne({ email });
    if (!user || !(await compare(password, user.password))) {
      return undefined;
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = await this.model.findById(id);
    if (!user) {
      return undefined;
    }

    Object.assign(user, updateUserDto);
    await this.model.updateOne({ _id: id }, user);
    return user;
  }

  remove(id: string): Promise<User> {
    return this.model.findByIdAndDelete(id);
  }
}

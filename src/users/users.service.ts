import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../authentication/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if(user) {
      user.password = undefined;
      return user;
    }
    throw new HttpException('User with this is does not exist', HttpStatus.NOT_FOUND);
  }

  async getByEmailOrPhone(data: string): Promise<User> {
    let user = await this.usersRepository.findOne({ email: data });
    if (!user) {
      user = await this.usersRepository.findOne({ phone: data });
    }
    if (user) {
      return user;
    }
    throw new HttpException('User with this email or phone does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: RegisterDto): Promise<User> {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    newUser.password = undefined;
    return newUser;
  }

  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update({ email }, {
      isEmailConfirmed: true
    });
  }

  async updatePassword(email: string, newPassword) {
    const user = await this.usersRepository.findOne({ email });
    if(!user)
      throw new NotFoundException('Unable to find user with that email');
    user.password = newPassword;
    return await this.usersRepository.save(user);
  }

  async makeAdmin(id: number) {
    const user = await this.usersRepository.findOne(id);
    if(!user)
      throw new NotFoundException('Unable to find user with that email');
    user.isAdmin = true;
    return await this.usersRepository.save(user);
  }
}

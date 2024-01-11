import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Role, User } from './entities/user.entity'
import { Model } from 'mongoose'
import { genSaltSync, hashSync } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create
  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword: string = hashSync(dto.password, genSaltSync(10))
    const candidate = await this.userModel.findOne({ email: dto.email }).exec()
    if (candidate) {
      throw new BadRequestException(
        `Пользователь с почтой ${dto.email} уже зарегистророван`,
      )
    }
    return await this.userModel.create({
      email: dto.email,
      password: hashedPassword,
      roles: Role.USER,
    })
  }

  // Find all
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}

import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Role, User } from './entities/user.entity'
import { Model } from 'mongoose'
import { genSaltSync, hashSync } from 'bcrypt'
import { DeleteUserDto } from './dto/delete-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create
  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword: string = hashSync(dto.password, genSaltSync(10))
    const candidate = await this.userModel.findOne({ email: dto.email }).exec()
    if (candidate) {
      throw new BadRequestException(`Пользователь с почтой ${dto.email} уже зарегистророван`)
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

  // Update
  async update(dto: UpdateUserDto): Promise<User> {
    const hashedPassword: string = hashSync(dto.password, genSaltSync(10))
    const candidate = await this.userModel.findOne({ email: dto.email }).exec()
    if (!candidate) {
      throw new BadRequestException(`Пользователь с почтой ${dto.email} не найден`)
    }
    return this.userModel.findOneAndUpdate(
      { email: dto.email },
      {
        password: hashedPassword,
        updatedAt: new Date(),
        roles: Role.USER,
      },
      { new: true },
    )
  }

  // Delete
  async remove(dto: DeleteUserDto) {
    if (dto.id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      const candidate = await this.userModel.findById(dto.id)
      if (!candidate) {
        throw new BadRequestException(`Пользователь с id ${dto.id} не найден`)
      } else {
        throw new BadRequestException('Введите корректный id')
      }
    }

    return await this.userModel.deleteOne({ _id: dto.id })
  }
}

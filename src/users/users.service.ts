import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Role, User } from './entities/user.entity'
import mongoose, { Model } from 'mongoose'
import { genSaltSync, hashSync } from 'bcrypt'
import { DeleteUserDto } from './dto/delete-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create
  async create(dto: CreateUserDto): Promise<User> | null {
    const user: User = await this.userModel
      .findOne({ email: dto.email })
      .exec()
      .catch(err => {
        console.log(err)
        return null
      })
    if (user) {
      throw new BadRequestException(`Пользователь с почтой ${dto.email} уже зарегистророван`)
    }
    const hashedPassword: string = hashSync(dto.password, genSaltSync(10))

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

  // Find One
  async findOne(email: string): Promise<User> | null {
    const user: User = await this.userModel.findOne({ email })
    if (!user) {
      return null
    }
    return user
  }

  // Update
  async update(dto: UpdateUserDto): Promise<User> {
    const hashedPassword: string = hashSync(dto.password, genSaltSync(10))
    const user: User = await this.userModel.findOne({ email: dto.email }).exec()
    if (!user) {
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
    if (mongoose.Types.ObjectId.isValid(dto.id)) {
      const user: User = await this.userModel.findById(dto.id)
      if (!user) {
        throw new BadRequestException(`Пользователь с id ${dto.id} не найден`)
      }
    } else {
      throw new BadRequestException('Проверьте правильность ввода id')
    }

    try {
      await this.userModel.deleteOne({ _id: dto.id })
      return {
        id: dto.id,
      }
    } catch (e) {
      console.log(e)
    }
  }
}

import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Role, User } from './entities/user.entity'
import mongoose, { Model } from 'mongoose'
import { genSaltSync, hashSync } from 'bcrypt'
import { DeleteUserDto } from './dto/delete-user.dto'
import Redis from 'ioredis'
import { RedisService } from '@liaoliaots/nestjs-redis'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)
  private readonly redis: Redis

  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient()
  }

  // Create
  public async create(dto: CreateUserDto, ip: string): Promise<User> {
    const count: number = await this.userModel.countDocuments({})
    if (count >= 25) {
      throw new ForbiddenException('Превышен лимит на создание пользователей. Обратитсь к администратору.')
    }
    const user: User = await this.userModel.findOne({ email: dto.email }).exec()
    if (user) {
      throw new BadRequestException(`Пользователь с почтой ${dto.email} уже зарегистророван`)
    }
    const hashedPassword: string = hashSync(dto.password, genSaltSync(10))
    const newUser = {
      email: dto.email,
      password: hashedPassword,
      roles: Role.USER,
      ip,
    }
    await this.redis.set(newUser.email, JSON.stringify(newUser))

    return await this.userModel.create(newUser)
  }

  // Find all
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  // Find One
  public async findOne(email: string, ip: string): Promise<User> | null {
    const user: User = await this.userModel.findOne({ email })
    if (!user) {
      return null
    }
    await this.userModel.updateOne({ email }, { ip })

    return user
  }

  // Find one by id
  public async findOneById(id: any): Promise<User> {
    const user: User = await this.userModel.findById(id)
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
    } catch (err) {
      this.logger.error(err)
    }
  }
}

import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './entities/user.entity'
import { Model } from 'mongoose'
import { genSaltSync, hashSync } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create or Update
  async save(dto: CreateUserDto): Promise<User> {
    const hashedPassword: string = hashSync(dto.password, genSaltSync(10))
    const id = dto.id ?? null
    console.log(id)
    const data = {
      email: dto.email,
      password: hashedPassword,
      roles: dto.roles ?? undefined,
    }
    const savedUser = await this.userModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
      upsert: true,
    })

    return savedUser
    // return await this.userModel.findOneAndUpdate({
    //   email: dto.email,
    //   password: hashedPassword,
    //   roles: dto.roles ?? undefined,
    // })
  }

  // Find all
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}

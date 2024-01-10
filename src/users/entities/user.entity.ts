import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { v4 } from 'uuid'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema()
export class User {
  @Prop({ type: String, default: v4 })
  id: string

  @Prop({ type: String, unique: true, required: true })
  email: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: Date, default: Date.now })
  createdAt: Date

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date

  @Prop({ type: String, enum: Role, default: Role.USER })
  roles: string

  @Prop({ required: false, default: false })
  isBlocked: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)

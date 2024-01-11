import mongoose, { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from './user.entity'

export type TokenDocument = HydratedDocument<Token>

@Schema()
export class Token {
  @Prop({ type: String })
  token: string

  @Prop({ type: Date })
  expiresIn: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User
}

export const TokenSchema = SchemaFactory.createForClass(Token)

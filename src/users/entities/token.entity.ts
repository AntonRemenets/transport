import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type TokenDocument = HydratedDocument<Token>

@Schema()
export class Token {
  @Prop({ type: String })
  token: string

  @Prop({ type: Date })
  exp: Date

  @Prop({ type: String, ref: 'User' })
  userId: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)

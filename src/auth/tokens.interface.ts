import { Token } from '../users/entities/token.entity'

export interface Tokens {
  accessToken: string
  refreshToken: Token
}

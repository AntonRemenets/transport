import { JwtAuthGuard } from './jwt-auth.guards'
import { RolesGuard } from './roles.guards'

export const GUARDS = [JwtAuthGuard, RolesGuard]

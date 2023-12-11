import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BusRoutesService {

  constructor(private prisma: PrismaService) { }

  async getAllRoutes() {
    return this.prisma.busRoutes.findMany()
  }
}

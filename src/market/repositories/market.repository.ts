import { PrismaService } from '../../db/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketRepository {
  constructor(private readonly prisma: PrismaService) {}
}

import { PrismaService } from '../../db/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import * as DbTypes from '../../db/db.types';

@Injectable()
export class MarketRepository {
  logger = new Logger('MarketReposiutory');

  constructor(private readonly prisma: PrismaService) {}

  async addToBuyList(ingredientName: DbTypes.IngredientsEnum, quantity) {
    return this.prisma.buyOrders.update({
      where: { ingredient: ingredientName },
      data: { quantityToBuy: { increment: quantity } },
    });
  }

  async removeFromBuyList(
    ingredient: DbTypes.IngredientsEnum,
    quantity: number,
  ) {
    const a = await this.prisma.$queryRaw`
      UPDATE "BuyOrders"
      SET "quantityToBuy" = "quantityToBuy" - ${quantity}
      WHERE ingredient::text = ${ingredient.toString()}
    `;

    return a;
  }

  async getBuyList() {
    return this.prisma.buyOrders.findMany();
  }

  /**
   * Locks table using advisory locks
   */
  async lockBuyListTable() {
    await this.prisma.$executeRaw`
      SELECT pg_advisory_lock(1);
    `;

    // this.logger.log('Advisory lock obtained for table BuyList');
  }

  /**
   * Unocks table using advisory locks
   */
  async unlockBuyListTable() {
    await this.prisma.$executeRaw`
      SELECT pg_advisory_unlock_all();
    `;

    // this.logger.log('Advisory lock released for table BuyList');
  }
}

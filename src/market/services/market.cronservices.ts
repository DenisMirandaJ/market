import { ExternalMarketService } from './external-market.service';
import { Injectable, Logger } from '@nestjs/common';
import { MarketRepository } from '../repositories/market.repository';
import { MarketMessagePublisherService } from './marketMessagePublisher.service';
import { Interval, Timeout } from '@nestjs/schedule';

@Injectable()
/**
 * Tasks that runs continually or on an schedule
 */
export class MarketCronService {
  private readonly logger = new Logger('MarketService');

  constructor(
    private readonly marketRepository: MarketRepository,
    private readonly marketMessagePublisherService: MarketMessagePublisherService,
    private readonly externalMarketService: ExternalMarketService,
  ) {}

  @Interval(1000 * 3)
  async buyIngredients() {
    await this.marketRepository.lockBuyListTable();

    const buyList = await this.marketRepository.getBuyList();

    for (const buyOrder of buyList) {
      if (buyOrder.quantityToBuy > 0) {
        const quantitySold =
          await this.externalMarketService.buyIngredientFromExternalMarket(
            buyOrder.ingredient,
          );

        if (quantitySold === 0) {
          continue;
        }

        this.logger.log(
          `${quantitySold} units of the ingredient ${buyOrder.ingredient} purchased`,
        );

        await this.marketRepository.removeFromBuyList(
          buyOrder.ingredient,
          quantitySold,
        );

        this.marketMessagePublisherService.publishIngredientBoughtMessage({
          ingredientName: buyOrder.ingredient,
          quantity: quantitySold,
        });
      }
    }

    await this.marketRepository.unlockBuyListTable();
  }

  @Timeout(0)
  async a() {
    await this.buyIngredients();
  }
}

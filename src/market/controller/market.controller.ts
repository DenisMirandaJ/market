import { BuyOrderDto } from './../dto/buyOrder.dto';
import { MarketService } from '../services/market.service';
import { Controller, Logger } from '@nestjs/common';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class MarketController {
  private readonly logger = new Logger('RabbitMQ');

  constructor(private readonly marketService: MarketService) {}

  @RabbitSubscribe({
    exchange: 'default-exchange',
    routingKey: 'ingredients.buy',
    queue: 'buy_ingredients_queue',
  })
  public async receiveBuyRequest(@RabbitPayload() message: BuyOrderDto) {
    this.logger.log(
      `INGREDIENTS_BUY_REQUEST message received for ingredient ${message?.ingredientName}, quantityToBuy=${message.quantityTobuy}`,
    );
    return await this.marketService.addToBuyList(
      message.ingredientName,
      message.quantityTobuy,
    );
  }
}

import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IngredientBoughtDto } from '../dto/ingredientBought.dto';

@Injectable()
export class MarketMessagePublisherService {
  private readonly logger = new Logger('RabbitMQModule');

  constructor(
    private readonly configService: ConfigService,
    private readonly rabbitMQConnection: AmqpConnection,
  ) {}

  private exchange = this.configService.get(
    'RABBITMQ_EXCHANGE',
    'default-exchange',
  );

  publishIngredientBoughtMessage(payload: IngredientBoughtDto) {
    const routingKey = 'ingredients.bought';

    this.rabbitMQConnection.publish(this.exchange, routingKey, payload);

    this.logger.log(
      `INGREDIENTS_BOUGHT message for ingredient ${payload.ingredientName} with quantity ${payload.quantity} published with routing key ${routingKey}`,
    );
  }
}

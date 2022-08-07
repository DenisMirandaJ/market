import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class MarketMessagePublisherService {
  private readonly logger = new Logger('RabbitMQModule');

  constructor(
    private readonly configService: ConfigService,
    private readonly rabbitMQConnection: AmqpConnection,
  ) {}
}

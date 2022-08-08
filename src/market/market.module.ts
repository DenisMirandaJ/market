import { MarketCronService } from './services/market.cronservices';
import { ExternalMarketService } from './services/external-market.service';
import { MarketMessagePublisherService } from './services/marketMessagePublisher.service';
import { PrismaModule } from '../db/prisma.module';
import { MarketRepository } from './repositories/market.repository';
import { MarketService } from './services/market.service';
import { MarketController } from './controller/market.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    PrismaModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('RABBITMQ_URL'),
        enableControllerDiscovery: true,
        connectionInitOptions: { wait: false },
        exchanges: [
          {
            name: configService.get('RABBITMQ_EXCHANGE', 'default-exchange'),
            type: 'topic',
          },
        ],
      }),
    }),
  ],
  controllers: [MarketController],

  providers: [
    MarketController,
    MarketService,
    MarketRepository,
    MarketMessagePublisherService,
    ExternalMarketService,
    MarketCronService,
  ],
})
export class MarketModule {}

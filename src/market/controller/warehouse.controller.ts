import { MarketService } from './../services/market.service';
import { Controller, Logger } from '@nestjs/common';

@Controller()
export class WarehouseController {
  private readonly logger = new Logger('RabbitMQ');

  constructor(private readonly warehouseService: MarketService) {}
}

import { Injectable, Logger } from '@nestjs/common';
import { MarketRepository } from '../repositories/warehouse.repository';
import { MarketMessagePublisherService } from './marketMessagePublisher.service';

@Injectable()
export class MarketService {
  private readonly logger = new Logger('MarketService');

  constructor(
    private readonly marketRepository: MarketRepository,
    private readonly marketMessagePublisherService: MarketMessagePublisherService,
  ) {}
}

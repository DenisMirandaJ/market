import { Injectable, Logger } from '@nestjs/common';
import { MarketRepository } from '../repositories/market.repository';
import { MarketMessagePublisherService } from './marketMessagePublisher.service';
import * as DBTypes from '../../db/db.types';

@Injectable()
export class MarketService {
  private readonly logger = new Logger('MarketService');

  constructor(
    private readonly marketRepository: MarketRepository,
    private readonly marketMessagePublisherService: MarketMessagePublisherService,
  ) {}

  async addToBuyList(
    ingredientName: DBTypes.IngredientsEnum,
    quantity: number,
  ) {
    await this.marketRepository.addToBuyList(ingredientName, quantity);
  }
}

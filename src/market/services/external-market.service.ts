import { ExternalMarketResponse } from './../types/externalMarket.types';
import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as DBTypes from '../../db/db.types';
import { apiRateLimiter, axiosInstance } from '../../utils/http.utils';

@Injectable()
/**
 * Tasks that runs continually or on an schedule
 */
export class ExternalMarketService {
  private readonly logger = new Logger('ExternalMarketService');

  constructor(private readonly configService: ConfigService) {}

  /**
   * @returns quantitySold
   */
  async buyIngredientFromExternalMarket(
    ingredient: DBTypes.IngredientsEnum,
  ): Promise<number> {
    const response = await apiRateLimiter.schedule(async () => {
      try {
        return axiosInstance.get<ExternalMarketResponse>(
          this.configService.get('EXTERNAL_MARKET_URL'),
          {
            params: { ingredient },
          },
        );
      } catch (error) {
        throw new ServiceUnavailableException(
          'Could not fetch from Hacker News API',
        );
      }
    });

    return response.data.quantitySold;
  }
}

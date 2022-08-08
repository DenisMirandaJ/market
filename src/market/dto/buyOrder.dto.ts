import { IsEnum, IsInt, Min } from 'class-validator';
import * as DBTypes from '../../db/db.types';

export class BuyOrderDto {
  @IsEnum(DBTypes.IngredientsEnum)
  ingredientName: DBTypes.IngredientsEnum;

  @IsInt()
  @Min(0)
  quantityTobuy: number;
}

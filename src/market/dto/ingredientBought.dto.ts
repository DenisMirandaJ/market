import { IsEnum, IsInt, Min } from 'class-validator';
import * as DbTypes from '../../db/db.types';

export class IngredientBoughtDto {
  @IsEnum(DbTypes.IngredientsEnum)
  ingredientName?: string;

  @IsInt()
  @Min(0)
  quantity: number;
}

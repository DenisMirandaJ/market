import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from '@nestjs/common';
import { validateSync } from 'class-validator';

export const validateDto = (
  dto: ClassConstructor<unknown>,
  objToValidate: unknown,
): ValidationError[] => {
  const validatedDto = plainToInstance(dto, objToValidate, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedDto as object, {
    skipMissingProperties: false,
  });

  return errors;
};

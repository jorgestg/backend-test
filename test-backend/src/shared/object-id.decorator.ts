import {
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidObjectId } from 'mongoose';

@ValidatorConstraint()
export class ValidObjectId implements ValidatorConstraintInterface {
  validate(text: string) {
    return isValidObjectId(text);
  }
}

export function IsObjectId() {
  return Validate(ValidObjectId, {
    message: 'Invalid ID',
  });
}

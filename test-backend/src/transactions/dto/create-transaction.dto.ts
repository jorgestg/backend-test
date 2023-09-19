import { IsInt, IsEnum, IsPositive, IsDate } from 'class-validator';
import { Direction } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsDate()
  date: Date;

  @IsEnum(Direction)
  direction: Direction;

  @IsInt()
  @IsPositive()
  amount: number;
}

import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly model: Model<Transaction>,
  ) {}

  create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.model.create({
      _id: new Types.ObjectId(),
      user: userId,
      ...createTransactionDto,
    });
  }

  findAll(userId: string): Promise<Transaction[]> {
    return this.model.find({ user: userId });
  }

  findOne(userId: string, id: string): Promise<Transaction | undefined> {
    return this.model.findOne({ _id: id, user: userId });
  }

  async update(
    userId: string,
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction | undefined> {
    const transaction = await this.model.findOne({ _id: id, user: userId });
    if (!transaction) {
      return undefined;
    }

    Object.assign(transaction, updateTransactionDto);
    await this.model.updateOne({ _id: id }, transaction);
    return transaction;
  }

  remove(userId: string, id: string): Promise<Transaction | undefined> {
    return this.model.findOneAndDelete({ _id: id, user: userId });
  }
}

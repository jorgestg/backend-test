import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ObjectIdDto } from 'src/shared/object-id.dto';
import { UserId } from 'src/auth/user.decorator';
import { UseAuthGuard } from 'src/auth/auth.guard';

@UseAuthGuard()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @UserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(@UserId() userId: string) {
    return this.transactionsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@UserId() userId: string, @Param() { id }: ObjectIdDto) {
    const transaction = await this.transactionsService.findOne(userId, id);
    if (!transaction) {
      throw new NotFoundException();
    }

    return transaction;
  }

  @Patch(':id')
  async update(
    @UserId() userId: string,

    @Param() { id }: ObjectIdDto,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionsService.update(
      userId,
      id,
      updateTransactionDto,
    );

    if (!transaction) {
      throw new NotFoundException();
    }

    return transaction;
  }

  @Delete(':id')
  async remove(@UserId() userId: string, @Param() { id }: ObjectIdDto) {
    const transaction = await this.transactionsService.remove(userId, id);
    if (!transaction) {
      throw new NotFoundException();
    }

    return null;
  }
}

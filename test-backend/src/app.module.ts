import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // normally I'd use `forRootAsync` with `ConfigService` here but for demo purposes this should do the trick
    MongooseModule.forRoot(
      process.env.DB_URL || 'mongodb://localhost/test-backend',
    ),
    TransactionsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

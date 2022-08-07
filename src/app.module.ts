import { MarketModule } from './market/market.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      // validate: validateEnvVariables,
      isGlobal: true,
    }),
    MarketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

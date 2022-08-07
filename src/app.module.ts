import { WarehouseModule } from './market/market.module';
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
    WarehouseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

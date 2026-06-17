import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, UsersController, OrdersController],
  providers: [AppService, UsersService, OrdersService],
})
export class AppModule {}

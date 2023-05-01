import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product/product.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    OrdersModule,
    MongooseModule.forRoot(
      process.env.DATABASE_NAME ||
        'mongodb+srv://ahsenhameed381:Shine&f9@cluster0.9q2ev15.mongodb.net/users',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

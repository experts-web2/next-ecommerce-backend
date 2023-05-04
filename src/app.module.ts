import { JwtStrategy } from './modules/auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product/product.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RolesModule } from './modules/roles/roles.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { VariantsModule } from './modules/variants/variants.module';
import { ProductcolorModule } from './modules/productcolor/productcolor.module';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    ProductModule,
    OrdersModule,
    RolesModule,
    VariantsModule,
    ProductcolorModule,
    JwtModule,
    MongooseModule.forRoot(
      'mongodb+srv://ahsenhameed381:Shine&f9@cluster0.9q2ev15.mongodb.net/users',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
  // ,{ provide: APP_GUARD, useClass: JwtAuthGuard }
})
export class AppModule {}

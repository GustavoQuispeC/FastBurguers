import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { PreloadService } from './preload.service';
import { Products } from './entities/products.entity';
import { Categories } from './entities/categories.entity';
import { Users } from './entities/users.entity';
import { OrdersModule } from './modules/orders/orders.module';
import { MorganMiddleware } from './middlewares/morgan.middleware';
import { TestimonyModule } from './modules/testimony/testimony.module';
import { PaymentsModule } from './paypal/payments.module';
import { StatusHistoriesModule } from './modules/status-histories/status-histories.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { OrderRatingsModule } from './modules/ordersrating/orderrating.module';
import { ProductRatingsModule } from './modules/productrating/productrating.module';
import { StorageController } from './modules/storage/storage.controller';
import { StorageService } from './modules/storage/storage.service';
import { StorageModule } from './modules/storage/storage.module';
import { Testimony } from './entities/testimony.entity';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Products, Categories, Users,Testimony]),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    AuthModule,
    FilesModule,
    OrdersModule,
    TestimonyModule,
    StatusHistoriesModule,
    PaymentsModule,
    MailerModule,
    OrderRatingsModule,
    ProductRatingsModule,
    StorageModule,
    ChatbotModule
  ],
  controllers: [AppController,],
  providers: [AppService, PreloadService,],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}

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
import { TestimonyController } from './modules/testimony/testimony.controller';
import { TestimonyModule } from './modules/testimony/testimony.module';
import { Orders } from './entities/orders.entity';
import { Testimony } from './entities/testimony.entity';
import { TestimonyService } from './modules/testimony/testimony.service';
import { PaymentsModule } from './paypal/payments.module';
import { StatusHistoriesModule } from './modules/status-histories/status-histories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),
    UsersModule, AuthModule,
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn:'60m'},
    }),
    CategoriesModule,
    ProductsModule,
    AuthModule,
    FilesModule,
    OrdersModule,
    TestimonyModule,
    TypeOrmModule.forFeature([Products,Categories,Users])
  ],
  controllers: [AppController],
  providers: [AppService, PreloadService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}

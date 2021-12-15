import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import {OrderHistoryModule} from './order-history/order-history.module'
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('TYPEORM_HOST'),
        port: +configService.get<number>('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    OrderModule,
    OrderHistoryModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
})
export class AppModule {}

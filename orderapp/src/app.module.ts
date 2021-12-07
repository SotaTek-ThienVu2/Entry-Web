import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dev',
      password: '123456',
      database: 'order',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),OrderModule
  ],
})
export class AppModule {}

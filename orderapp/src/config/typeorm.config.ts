import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: 'dev',
    password: '123456',
    database: 'order',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  }
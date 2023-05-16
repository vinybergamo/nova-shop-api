import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      database: 'nova-shop',
      synchronize: true,
      autoLoadEntities: true,
      cache: false,
      logger: 'file',
      logging: true,
    }),
  ],
})
export class DatabaseModule {}

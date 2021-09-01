import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { snakeCase } from 'typeorm/util/StringUtils';
import CustomNamingStrategy from './database/CustomNamingStrategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [
          join(__dirname, '**', '*.entity.{ts,js}')
        ],
        namingStrategy: new CustomNamingStrategy(),
        synchronize: true
      })
    })
  ]
})
export class DatabaseModule {}
import { config } from 'dotenv';

config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from "@nestjs/jwt";

import { UsersService } from "./users/users.service";
import {AuthService} from "./auth/auth.service";
import {FileUploadService} from "./file/file-upload.service";

import { User } from "./users/entities/users.entity";
import { File } from "./file/entities/file.entity";

import {UsersController} from "./users/users.controller";
import {FileUploadController} from "./file/file-upload.controller";
import {AuthController} from "./auth/auth.controller";

import {JwtStrategy} from "./auth/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, File]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    })],
  controllers: [UsersController, AuthController, FileUploadController],
  providers: [UsersService, AuthService, FileUploadService, JwtStrategy]
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "gumball-sqlite-database.sqlite",
      entities: [Comment],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

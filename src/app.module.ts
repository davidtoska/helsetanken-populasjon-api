import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JsonReaderService } from './json-reader/json-reader.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'data') }),
  ],
  controllers: [AppController],
  providers: [AppService, JsonReaderService],
})
export class AppModule {}

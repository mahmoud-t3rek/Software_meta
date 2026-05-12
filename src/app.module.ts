import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from './DB/connection/db.connection';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import {ThrottlerModule} from '@nestjs/throttler';
@Module({
  imports: [  
     ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),Connection(), AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  
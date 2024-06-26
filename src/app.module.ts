import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModelModule } from './schemas/mongoose-model.module';
import { AuthModule } from './core/auth/auth.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const username = configService.get('DATABASE_USER');
        const password = configService.get('DATABASE_PASSWORD');
        const host = configService.get('DATABASE_HOST');
        const databaseName = configService.get('DATABASE_NAME');

        const uri = `mongodb+srv://${username}:${password}@${host}/${databaseName}`;

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModelModule,
    AuthModule,
    ModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Lê o .env da raiz do monorepo (e o local do app, se existir)
      envFilePath: ['.env', '../../.env'],
    }),
    HealthModule,
  ],
})
export class AppModule {}

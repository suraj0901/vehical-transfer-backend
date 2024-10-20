import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { VehicleModule } from './vehicle/vehicle.module';
import { DriverModule } from './driver/driver.module';
import { VehicleTransferModule } from './vehicle-transfer/vehicle-transfer.module';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    TypeOrmModule.forRoot(AppDataSource),
    VehicleModule,
    DriverModule,
    VehicleTransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

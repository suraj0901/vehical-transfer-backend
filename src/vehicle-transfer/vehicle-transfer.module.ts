import { Module } from '@nestjs/common';
import { VehicleTransferService } from './vehicle-transfer.service';
import { VehicleTransferController } from './vehicle-transfer.controller';

@Module({
  controllers: [VehicleTransferController],
  providers: [VehicleTransferService],
})
export class VehicleTransferModule {}

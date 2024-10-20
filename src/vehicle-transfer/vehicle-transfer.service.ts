import { Injectable } from '@nestjs/common';
import { CreateVehicleTransferDto } from './dto/create-vehicle-transfer.dto';
import { UpdateVehicleTransferDto } from './dto/update-vehicle-transfer.dto';

@Injectable()
export class VehicleTransferService {
  create(createVehicleTransferDto: CreateVehicleTransferDto) {
    return 'This action adds a new vehicleTransfer';
  }

  findAll() {
    return `This action returns all vehicleTransfer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicleTransfer`;
  }

  update(id: number, updateVehicleTransferDto: UpdateVehicleTransferDto) {
    return `This action updates a #${id} vehicleTransfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicleTransfer`;
  }
}

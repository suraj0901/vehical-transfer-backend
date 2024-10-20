import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleTransferService } from './vehicle-transfer.service';
import { CreateVehicleTransferDto } from './dto/create-vehicle-transfer.dto';
import { UpdateVehicleTransferDto } from './dto/update-vehicle-transfer.dto';

@Controller('vehicle-transfer')
export class VehicleTransferController {
  constructor(private readonly vehicleTransferService: VehicleTransferService) {}

  @Post()
  create(@Body() createVehicleTransferDto: CreateVehicleTransferDto) {
    return this.vehicleTransferService.create(createVehicleTransferDto);
  }

  @Get()
  findAll() {
    return this.vehicleTransferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleTransferService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleTransferDto: UpdateVehicleTransferDto) {
    return this.vehicleTransferService.update(+id, updateVehicleTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleTransferService.remove(+id);
  }
}

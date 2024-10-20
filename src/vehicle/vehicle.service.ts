import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { QueryParams, searchAndFilter } from 'src/common/utils';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}
  create(createVehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.save(createVehicleDto);
  }

  query(queryParams: QueryParams) {
    return searchAndFilter(
      {
        repository: this.vehicleRepository,
        searchFields: ['vehicleNumber'],
        filterFields: ['vehicleType'],
        sortFields: ['id'],
      },
      queryParams,
    );
  }

  findAll() {
    return this.vehicleRepository.find();
  }

  findOne(id: number) {
    return this.vehicleRepository.findOneBy({ id });
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    vehicle.vehicleNumber = updateVehicleDto.vehicleNumber;
    vehicle.vehicleType = updateVehicleDto.vehicleType;
    vehicle.pucCertificate = updateVehicleDto.pucCertificate;
    vehicle.insuranceCertificate = updateVehicleDto.insuranceCertificate;

    return this.vehicleRepository.save(vehicle);
  }

  remove(id: number) {
    return this.vehicleRepository.delete(id);
  }
}

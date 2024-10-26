import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { QueryParams, searchAndFilter } from 'src/common/utils';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}
  create(createDriverDto: CreateDriverDto) {
    return this.driverRepository.save(createDriverDto);
  }

  query(queryParams: QueryParams) {
    return searchAndFilter(
      {
        repository: this.driverRepository,
        searchFields: ['name'],
        filterFields: ['phone_number'],
        sortFields: ['id'],
      },
      queryParams,
    );
  }

  findAll() {
    return this.driverRepository.find();
  }

  findOne(id: number) {
    return this.driverRepository.findOneBy({ id });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    driver.name = updateDriverDto.name;
    driver.phone_number = updateDriverDto.phone_number;
    driver.profile_photo = updateDriverDto.profile_photo;
    return this.driverRepository.save(driver);
  }

  remove(id: number) {
    return this.driverRepository.delete(id);
  }
}

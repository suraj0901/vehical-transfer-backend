import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver } from './entities/driver.entity';
import { get } from 'http';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';

describe('DriverController', () => {
  let controller: DriverController;
  let driverService: DriverService;
  let mockDriver = new Driver();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        DriverService,
        {
          provide: getRepositoryToken(Driver),
          useValue: {
            save: jest.fn().mockResolvedValue(mockDriver),
            findOneBy: jest.fn().mockResolvedValue([mockDriver]),
          },
        },
      ],
    }).compile();

    controller = module.get<DriverController>(DriverController);
    driverService = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

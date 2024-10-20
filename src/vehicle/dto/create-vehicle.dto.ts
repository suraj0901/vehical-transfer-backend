import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty({ message: 'Vehicle number cannot be empty' })
  @Length(1, 15, {
    message: 'Vehicle number must be between 1 and 15 characters',
  })
  vehicleNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Vehicle type cannot be empty' })
  @Length(1, 50, {
    message: 'Vehicle type must be between 1 and 50 characters',
  })
  vehicleType: string;

  @IsString()
  @IsNotEmpty({ message: 'PUC certificate cannot be empty' })
  @IsUrl({}, { message: 'PUC certificate photo must be a valid URL' })
  pucCertificate: string;

  @IsString()
  @IsNotEmpty({ message: 'Insurance certificate cannot be empty' })
  @IsUrl({}, { message: 'Insurance certificate photo must be a valid URL' })
  insuranceCertificate: string;
}

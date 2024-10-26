import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  @IsPhoneNumber('IN', {
    message: 'Please enter a valid phone number',
  })
  phone_number: string;

  @IsOptional()
  @IsString()
  profile_photo?: string;
}

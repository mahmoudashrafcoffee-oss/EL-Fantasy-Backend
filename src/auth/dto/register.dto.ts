import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @IsOptional()
  favouriteTeamId?: string;

  @IsString()
  @IsOptional()
  nationalityId?: string;
}

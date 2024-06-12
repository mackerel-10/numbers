import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class EnvDto {
  // Database configuration
  @IsString()
  @IsNotEmpty()
  MYSQL_HOST!: string;

  @IsNumber()
  @IsNotEmpty()
  MYSQL_PORT!: number;

  @IsString()
  @IsNotEmpty()
  MYSQL_DATABASE!: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_USER!: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_PASSWORD!: string;

  // Server configuration
  @IsNumber()
  @IsNotEmpty()
  PORT!: number;

  // Logger configuration
  @IsString()
  @IsNotEmpty()
  LOG_LEVEL!: string;

  // Bcrypt configuration
  @IsNumber()
  @IsNotEmpty()
  SALT_ROUNDS!: number;
}

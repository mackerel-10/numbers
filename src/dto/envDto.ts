import { IsNotEmpty, IsNumber } from 'class-validator';

class EnvDto {
  @IsNumber()
  @IsNotEmpty()
  PORT!: number;
}

export default EnvDto;

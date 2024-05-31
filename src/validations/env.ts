import { IsNotEmpty, IsNumber } from 'class-validator';

export default class Env {
  @IsNumber()
  @IsNotEmpty()
  PORT!: number;
}

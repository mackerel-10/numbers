import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password!: string;
}

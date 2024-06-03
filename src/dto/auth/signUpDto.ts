import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

class signUpDto {
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

export default signUpDto;

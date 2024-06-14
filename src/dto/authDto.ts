import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  MaxLength,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(32)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20) // Original password length
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  dayOfBirth!: string;
}

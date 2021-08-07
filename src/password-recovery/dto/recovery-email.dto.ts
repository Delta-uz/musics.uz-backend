import { IsNotEmpty, IsString } from 'class-validator';

export default class RecoveryEmailDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
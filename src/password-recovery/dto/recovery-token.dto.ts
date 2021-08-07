import { IsNotEmpty, IsString } from 'class-validator';

export default class RecoveryTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
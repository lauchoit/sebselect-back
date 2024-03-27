import { IsOptional, IsString } from 'class-validator';

export class SelectDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  patternWord: string;
}

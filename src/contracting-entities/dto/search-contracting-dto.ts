import { ArrayMinSize, IsArray } from 'class-validator';

export class SearchContractingDto {
  @IsArray()
  @ArrayMinSize(1)
  parentNames: string[];
}

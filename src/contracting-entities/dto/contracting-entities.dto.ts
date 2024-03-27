import { IsString, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

class ParentLocatedDto {
  @IsString()
  name: string;
}

export class ContractingEntitiesDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  nif: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts: ContactDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParentLocatedDto)
  parentLocatedParty: ParentLocatedDto[];
}

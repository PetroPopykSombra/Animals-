export class Animal {
  constructor(
    public name = '',
    public type = AnimalTypeEnum.ALL,
    public gender = AnimalGenderEnum.ALL,
    public description = '',
    public medicalNotes = '',
    public photos = [],
    public age = '',
    public breed = '',
    public id = null,
    public isAdopted = false
  ) {}

}

export enum AnimalGenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  ALL = 'ALL',
}

export enum AnimalTypeEnum {
  CAT = 'CAT',
  DOG = 'DOG',
  ALL = 'ALL',
}

export interface FilterOptions {
  name: string;
  type: AnimalTypeEnum;
  gender: AnimalGenderEnum;
  breed: string;
}


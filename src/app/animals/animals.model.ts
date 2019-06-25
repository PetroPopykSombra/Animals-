export class Animal {
  constructor(
    public name = '',
    public type = AnimalTypeEnum.ALL,
    public gender = AnimalGenderEnum.ALL,
    public description = '',
    public photo = '',
    public age = '',
    public breed = '',
    public id = null,
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


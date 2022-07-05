import { Expose, Exclude } from 'class-transformer';
import { BaseModel } from './_base.model';

export class User extends BaseModel {
  @Exclude()
  id: number;

  @Expose({ name: 'user_id' })
  userId: string;

  @Expose()
  account: string;

  @Expose()
  telephone: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  salt: string;

  @Expose()
  name: string;

  @Expose()
  py: string;

  @Expose()
  header: string;

  @Expose()
  sex: string;

  @Expose()
  birth: string;

  @Expose()
  mobile: string;

  @Expose({ name: 'org_id' })
  orgId: string;

  @Expose({ name: 'org_code' })
  orgCode: string;

  @Expose({ name: 'dept_id' })
  deptId: string;

  @Expose()
  province: string;

  @Expose({ name: 'province_name' })
  provinceName: string;

  @Expose()
  city: string;

  @Expose({ name: 'city_name' })
  cityName: string;

  @Expose()
  area: string;

  @Expose({ name: 'area_name' })
  areaName: string;

  @Expose()
  street: string;

  @Expose({ name: 'street_name' })
  streetName: string;

  @Expose()
  address: string;

  @Expose()
  memo: string;
}

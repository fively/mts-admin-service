import { Expose, Exclude, Transform, Type } from 'class-transformer';
import * as moment from 'moment';
import { Moment } from 'moment';

export abstract class BaseModel {
  @Expose({ name: 'create_id' })
  createId: string;

  @Expose({ name: 'create_name' })
  createName: string;

  @Expose({ name: 'create_time' })
  @Type(() => Date)
  @Transform(({ value }) => moment(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  createTime: Moment;

  @Expose({ name: 'update_id', toPlainOnly: true })
  updateId: string;

  @Expose({ name: 'update_name', toPlainOnly: true })
  updateName: string;

  @Expose({ name: 'update_time', toPlainOnly: true })
  @Type(() => Date)
  @Transform(({ value }) => moment(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  updateTime: Moment;

  @Expose()
  status: number;

  @Exclude()
  deleted: number;
}

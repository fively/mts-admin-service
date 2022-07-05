import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from '@/db';
import { plainToInstance } from 'class-transformer';
import { User } from '@/model';

@Injectable()
export class UserService {
  @InjectKnex() private readonly db: Knex;

  /**
   * 根据账号获取用户信息
   * @param account
   * @returns
   */
  async getUserByAccount(account: string): Promise<User> {
    const result = await this.db('os_user').where({ account }).first();

    return plainToInstance(User, result, { exposeDefaultValues: true });
  }
}

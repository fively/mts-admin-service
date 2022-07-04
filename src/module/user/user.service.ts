import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserByAccount(account: string): Object {
    return {
      account: account,
      name: 'admin',
      tel: '12345678901',
      mail: 'admin@126.com',
      address: '江苏苏州市',
    };
  }
}

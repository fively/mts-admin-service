import * as path from 'path';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { promisify } from 'util';

const fsPromise = fs.promises;

/**
 * 公钥和私钥文件路径
 */
const filePathes = {
  public: path.join('.data', 'PUBLIC-KEY'),
  private: path.join('.data', 'PRIVATE_KEY')
};

const asyncGenerateKeyPair = promisify(crypto.generateKeyPair);

@Injectable()
export class CryptoService {
  /**
   * 生成密钥对
   */
  private async generateKeys(): Promise<void> {
    const { publicKey, privateKey } = await asyncGenerateKeyPair('rsa', {
      modulusLength: 1024,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
    });

    // 保证数据目录存在
    await fsPromise.mkdir('.data');

    // 并发，异步保存公钥和私钥
    await Promise.all([fsPromise.writeFile(filePathes.public, publicKey), fsPromise.writeFile(filePathes.private, privateKey)]);
  }

  /**
   * 获取密钥
   * @param type
   * @returns
   */
  private async getKey(type: string): Promise<string> {
    const filePath = filePathes[type];
    const getter = async () => {
      // 这是一个异步操作，返回读取的内容，或者 空（如果读取失败）
      try {
        return await fsPromise.readFile(filePath, 'utf-8');
      } catch (err) {
        console.error('[error occur while read file]', err);
        return '';
      }
    };

    // 尝试加载（读取）密钥数据，加载成功直接返回
    const key = await getter();
    if (key) {
      return key;
    }

    // 上一步加载失败，产生新的密钥对，并重新加载
    await this.generateKeys();
    return await getter();
  }
  /**
   * 获取公钥
   * @returns
   */
  public getPublicKey(): Promise<string> {
    return this.getKey('public');
  }

  /**
   * 获取私钥
   * @returns
   */
  public getPrivateKey(): Promise<string> {
    return this.getKey('private');
  }

  /**
   * 数据进行解密
   * @param data
   * @returns
   */
  public async decrypt(data) {
    const key = await this.getPrivateKey();
    return crypto
      .privateDecrypt(
        {
          key,
          padding: crypto.constants.RSA_PKCS1_PADDING
        },
        Buffer.from(data, 'base64')
      )
      .toString('utf8');
  }

  /**
   * 数据进行解密
   * @param password 密码
   * @param salt 盐值
   * @returns
   */
  public encrypt(password, salt): string {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
  }

  /**
   * 获取随机盐值
   * @returns
   */
  public randomSalt(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}

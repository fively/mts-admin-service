import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional() // 可选参数
  @IsPositive() // 是否为正数
  page: number;

  @IsOptional() // 可选参数
  @IsPositive() // 是否为正数
  limit: number;
}

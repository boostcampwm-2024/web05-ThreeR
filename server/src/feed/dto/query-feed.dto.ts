import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryFeedDto {
  @IsOptional()
  @IsInt({
    message: '정수를 입력해주세요.',
  })
  @Type(() => Number)
  lastId?: number;

  @IsOptional()
  @IsInt({
    message: '정수를 입력해주세요.',
  })
  @Type(() => Number)
  limit?: number = 12;
}

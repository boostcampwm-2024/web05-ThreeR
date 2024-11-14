import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryFeedDto {
  @ApiPropertyOptional({
    example: '10',
    description: '마지막으로 받은 피드의 ID를 입력해주세요.',
  })
  @IsOptional()
  @IsInt({
    message: '정수를 입력해주세요.',
  })
  @Type(() => Number)
  lastId?: number;

  @ApiPropertyOptional({
    example: '10',
    description: '한 번에 가져올 피드 수를 입력해주세요.',
  })
  @IsOptional()
  @IsInt({
    message: '정수를 입력해주세요.',
  })
  @Type(() => Number)
  limit?: number = 12;
}

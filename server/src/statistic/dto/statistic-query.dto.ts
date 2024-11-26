import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class StatisticQueryDto {
  @ApiProperty({
    description: '최대로 가져올 데이터 개수를 입력하세요.',
  })
  @IsOptional()
  @IsInt({ message: '정수로 입력해주세요.' })
  @Type(() => Number)
  limit?: number = 10;
}

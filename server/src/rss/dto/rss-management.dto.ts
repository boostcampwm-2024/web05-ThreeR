import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class RssManagementDto {
  @IsInt({
    message: '정수를 입력해주세요.',
  })
  @Type(() => Number)
  id: number;
}

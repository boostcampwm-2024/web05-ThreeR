import { validate } from 'class-validator';
import { QueryFeedDto } from '../../../src/feed/dto/query-feed.dto';

describe('QueryFeedDto Test', () => {
  //given
  let queryFeedDto: QueryFeedDto;

  beforeEach(() => {
    queryFeedDto = new QueryFeedDto();
  });

  it('limit에 1보다 작은 값을 입력하면 유효성 검사에 실패한다.', async () => {
    //given
    queryFeedDto.limit = -1;

    //when
    const errors = await validate(queryFeedDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('limit에 자연수가 아닌 실수를 입력하면 유효성 검사에 실패한다.', async () => {
    //given
    queryFeedDto.limit = 1.254;

    //when
    const errors = await validate(queryFeedDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('limit에 문자열을 입력하면 유효성 검사에 실패한다.', async () => {
    //given
    queryFeedDto.limit = 'abcdefg' as any;

    //when
    const errors = await validate(queryFeedDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('lastId에 음수를 입력하면 유효성 검사에 실패한다.', async () => {
    //given
    queryFeedDto.lastId = -1;

    //when
    const errors = await validate(queryFeedDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('lastId에 자연수가 아닌 실수를 입력하면 유효성 검사에 실패한다.', async () => {
    //given
    queryFeedDto.lastId = 1.254;

    //when
    const errors = await validate(queryFeedDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('lastId에 문자열을 입력하면 유효성 검사에 실패한다.', async () => {
    //given
    queryFeedDto.lastId = 'abcdefg' as any;

    //when
    const errors = await validate(queryFeedDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });
});

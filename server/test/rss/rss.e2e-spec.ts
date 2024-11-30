import { INestApplication } from '@nestjs/common';
import { RssRegisterDto } from '../../src/rss/dto/rss-register.dto';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { Rss, RssAccept } from '../../src/rss/rss.entity';
import { RssFixture } from './fixture/rssFixture';
import { RssAcceptFixture } from './fixture/rssAcceptFixture';
import {
  RssAcceptRepository,
  RssRepository,
} from '../../src/rss/rss.repository';

describe('Rss E2E Test', () => {
  let app: INestApplication;
  let rssRepository: Repository<Rss>;
  let rssAcceptRepository: Repository<RssAccept>;

  beforeAll(async () => {
    app = global.testApp;
    rssRepository = app.get(RssRepository);
    rssAcceptRepository = app.get(RssAcceptRepository);
  });

  beforeEach(async () => {
    await rssRepository.delete({});
  });

  describe('POST /api/rss', () => {
    describe('정상적인 요청을 한다.', () => {
      it('정상적인 요청에 대한 응답을 한다.', async () => {
        const requestDto = RssRegisterDto.from(RssFixture.createRssFixture());
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(requestDto);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('신청이 완료되었습니다.');
      });

      it('이미 신청했던 RSS를 또 신청한다.', async () => {
        const requestDto = RssRegisterDto.from(RssFixture.createRssFixture());
        await request(app.getHttpServer()).post('/api/rss').send(requestDto);
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(requestDto);
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('이미 신청된 RSS URL입니다.');
      });

      it('이미 등록된 RSS를 또 신청한다.', async () => {
        // given
        const acceptedRss = await rssAcceptRepository.save(
          RssAcceptFixture.createRssAcceptFixture(),
        );
        const rssRegisterDto = RssRegisterDto.from(acceptedRss);

        // when
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(rssRegisterDto);

        // then
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('이미 등록된 RSS URL입니다.');
      });
    });

    describe('비정상적인 요청을 한다.', () => {
      describe('블로그 이름을 올바르게 입력하지 않는다.', () => {
        it('블로그 이름이 없다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          delete rss.name;
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('블로그 이름이 없습니다.');
        });

        it('블로그 이름이 빈 문자열이다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.name = '';
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('블로그 이름이 없습니다.');
        });

        it('블로그 이름이 문자열이 아니다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.name = 12345 as any;
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('문자열로 입력해주세요.');
        });
      });

      describe('실명을 올바르게 입력하지 않는다.', () => {
        it('실명이 없다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          delete rss.userName;
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('실명이 없습니다.');
        });

        it('실명이 빈 문자열이다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.userName = '';
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('실명이 없습니다.');
        });

        it('실명이 문자열이 아니다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.userName = 12345 as any;
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('문자열로 입력해주세요.');
        });

        it('실명의 길이가 2자리보다 작다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.userName = 'A';
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('이름 길이가 올바르지 않습니다.');
        });

        it('실명의 길이가 50자리보다 크다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.userName = 'A'.repeat(51);
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('이름 길이가 올바르지 않습니다.');
        });
      });

      describe('이메일을 올바르게 입력하지 않는다.', () => {
        it('이메일이 없다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          delete rss.email;
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('이메일이 없습니다.');
        });

        it('이메일이 빈 문자열이다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.email = '';
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('이메일이 없습니다.');
        });

        it('이메일 형식이 올바르지 않다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.email = 'invalid-email';
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe(
            '이메일 주소 형식에 맞춰서 작성해주세요.',
          );
        });
      });

      describe('RSS URL을 올바르게 입력하지 않는다.', () => {
        it('RSS URL이 없다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          delete rss.rssUrl;
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('RSS URL이 없습니다.');
        });

        it('RSS URL이 빈 문자열이다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.rssUrl = '';
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('RSS URL이 없습니다.');
        });

        it('RSS URL 형식이 잘못되었다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.rssUrl = 'invalid-url';
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe(
            'http, https 프로토콜과 URL 형식을 맞춰주세요.',
          );
        });

        it('http, https 프로토콜을 제외한 다른 프로토콜을 입력한다.', async () => {
          // given
          const rss = RssFixture.createRssFixture();
          rss.rssUrl = 'ftp://example.com/rss';
          const requestDto = RssRegisterDto.from(rss);

          // when
          const response = await request(app.getHttpServer())
            .post('/api/rss')
            .send(requestDto);

          // then
          expect(response.status).toBe(400);
          expect(response.body.message).toBe(
            'http, https 프로토콜과 URL 형식을 맞춰주세요.',
          );
        });
      });
    });
  });

  describe('GET /api/rss', () => {
    describe('정상적인 요청을 한다.', () => {
      it('RSS가 등록되지 않은 경우 빈 리스트를 반환한다.', async () => {
        // when - then
        const response = await request(app.getHttpServer()).get('/api/rss');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([]);
      });

      it('등록된 RSS가 존재할 경우 해당 데이터를 반환한다.', async () => {
        // given
        const rss = RssFixture.createRssFixture();
        const expectedResult = await rssRepository.save(rss);

        // when
        const response = await request(app.getHttpServer()).get('/api/rss');

        //then
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([expectedResult]);
      });
    });
  });
});

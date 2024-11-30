import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RssRegisterDto } from '../../src/rss/dto/rss-register.dto';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { Rss, RssAccept } from '../../src/rss/rss.entity';

describe('Rss Register E2E Test : POST /api/rss', () => {
  let app: INestApplication;
  let input: RssRegisterDto;
  let dataSource: DataSource;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    app = global.testApp;
    moduleFixture = global.testModuleFixture;
  });

  beforeEach(async () => {
    dataSource = moduleFixture.get<DataSource>(DataSource);
    const rssRepository = dataSource.getRepository(Rss);
    await rssRepository.query('DELETE FROM rss'); // rss 테이블 초기화
    input = {
      blog: 'seok3765.log',
      name: 'J235_조민석',
      email: 'seok3765@naver.com',
      rssUrl: 'https://example.com/rss',
    };
  });

  afterAll(async () => {
    await app.close();
  });

  describe('정상적인 요청을 한다.', () => {
    it('정상적인 요청에 대한 응답을 한다.', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/rss')
        .send(input);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('신청이 완료되었습니다.');
    });

    it('이미 신청했던 RSS를 또 신청한다.', async () => {
      await request(app.getHttpServer()).post('/api/rss').send(input);
      const response = await request(app.getHttpServer())
        .post('/api/rss')
        .send(input);
      expect(response.status).toBe(409);
      expect(response.body.message).toBe('이미 신청된 RSS URL입니다.');
    });

    it('이미 등록된 RSS를 또 신청한다.', async () => {
      const blogRepository = dataSource.getRepository(RssAccept);
      const blog = blogRepository.create({
        name: input.blog,
        userName: input.name,
        email: input.email,
        rssUrl: input.rssUrl,
      });
      await blogRepository.save(blog);

      const response = await request(app.getHttpServer())
        .post('/api/rss')
        .send(input);
      expect(response.status).toBe(409);
      expect(response.body.message).toBe('이미 등록된 RSS URL입니다.');
    });
  });

  describe('비정상적인 요청을 한다.', () => {
    describe('블로그 이름을 올바르게 입력하지 않는다.', () => {
      it('블로그 이름이 없다.', async () => {
        delete input.blog;
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('블로그 이름이 없습니다.');
      });

      it('블로그 이름이 빈 문자열이다.', async () => {
        input.blog = '';
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('블로그 이름이 없습니다.');
      });
      it('블로그 이름이 문자열이 아니다.', async () => {
        input.blog = 12345 as any;
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('문자열로 입력해주세요.');
      });
    });

    describe('실명을 올바르게 입력하지 않는다.', () => {
      it('실명이 없다.', async () => {
        delete input.name;
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('실명이 없습니다.');
      });

      it('실명이 빈 문자열이다.', async () => {
        input.name = '';
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('실명이 없습니다.');
      });

      it('실명이 문자열이 아니다.', async () => {
        input.name = 12345 as any; // invalid name type
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('문자열로 입력해주세요.');
      });

      it('실명의 길이가 2자리보다 작다.', async () => {
        input.name = 'A';
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('이름 길이가 올바르지 않습니다.');
      });

      it('실명의 길이가 50자리보다 크다.', async () => {
        input.name = 'A'.repeat(51); // name too long
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('이름 길이가 올바르지 않습니다.');
      });
    });

    describe('이메일을 올바르게 입력하지 않는다.', () => {
      it('이메일이 없다.', async () => {
        delete input.email;
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('이메일이 없습니다.');
      });

      it('이메일이 빈 문자열이다.', async () => {
        input.email = '';
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('이메일이 없습니다.');
      });

      it('이메일 형식이 올바르지 않다.', async () => {
        input.email = 'invalid-email';
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          '이메일 주소 형식에 맞춰서 작성해주세요.',
        );
      });
    });

    describe('RSS URL을 올바르게 입력하지 않는다.', () => {
      it('RSS URL이 없다.', async () => {
        delete input.rssUrl;
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('RSS URL이 없습니다.');
      });

      it('RSS URL이 빈 문자열이다.', async () => {
        input.rssUrl = '';
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('RSS URL이 없습니다.');
      });

      it('RSS URL 형식이 잘못되었다.', async () => {
        input.rssUrl = 'invalid-url';
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          'http, https 프로토콜과 URL 형식을 맞춰주세요.',
        );
      });

      it('http, https 프로토콜을 제외한 다른 프로토콜을 입력한다.', async () => {
        input.rssUrl = 'ftp://example.com/rss';
        const response = await request(app.getHttpServer())
          .post('/api/rss')
          .send(input);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          'http, https 프로토콜과 URL 형식을 맞춰주세요.',
        );
      });
    });
  });
});

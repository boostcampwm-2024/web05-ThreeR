import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AdminService } from '../../src/admin/admin.service';
import { RegisterAdminDto } from '../../src/admin/dto/register-admin.dto';
import { LoginAdminDto } from '../../src/admin/dto/login-admin.dto';
import { v4 as uuidv4 } from 'uuid';

describe('Feed E2E Test', () => {
  let app: INestApplication;
  let adminService: AdminService;

  //given
  const loginAdminDto: LoginAdminDto = {
    loginId: 'testAdminId',
    password: 'testAdminPassword!',
  };
  const registerAdminDto: RegisterAdminDto = {
    loginId: 'testNewAdminId',
    password: 'testNewAdminPassword!',
  };

  beforeAll(async () => {
    app = global.testApp;
    adminService = app.get(AdminService);

    await adminService.registerAdmin(loginAdminDto);
  });

  describe('POST api/admin/login', () => {
    describe('관리자 페이지에서 정상적인 요청을 전송한다.', () => {
      it('등록된 계정은 정상적으로 로그인할 수 있다.', async () => {
        //when
        const response = await request(app.getHttpServer())
          .post('/api/admin/login')
          .send(loginAdminDto);

        //then
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(
          '로그인이 성공적으로 처리되었습니다.',
        );
      });

      it('등록되지 않은 계정은 401 UnAuthorized 예외가 발생한다.', async () => {
        //given
        const loginWrongAdminIdDto: LoginAdminDto = {
          loginId: 'testWrongAdminId',
          password: 'testAdminPassword!',
        };

        //when
        const response = await request(app.getHttpServer())
          .post('/api/admin/login')
          .send(loginWrongAdminIdDto);

        //then
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(
          '아이디 혹은 비밀번호가 잘못되었습니다.',
        );
      });

      it('비밀번호가 다르다면 401 UnAuthorized 예외가 발생한다.', async () => {
        //given
        const loginWrongAdminPasswordDto: LoginAdminDto = {
          loginId: 'testAdminId',
          password: 'testWrongAdminPassword!',
        };
        //when
        const response = await request(app.getHttpServer())
          .post('/api/admin/login')
          .send(loginWrongAdminPasswordDto);

        //then
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(
          '아이디 혹은 비밀번호가 잘못되었습니다.',
        );
      });
    });
  });

  describe('POST api/admin/register', () => {
    describe('정상적인 데이터로 관리자 회원가입 요청을 전송한다.', () => {
      it('관리자가 로그인 되어 있음을 확인할 수 있을 때만 관리자 회원가입을 할 수 있다.', async () => {
        //given
        const agent = request.agent(app.getHttpServer());

        //when
        await agent.post('/api/admin/login').send(loginAdminDto);
        const response = await agent
          .post('/api/admin/register')
          .send(registerAdminDto);

        //then
        expect(response.status).toBe(201);
        expect(response.body.message).toBe(
          '성공적으로 관리자 계정이 생성되었습니다.',
        );
      });

      it('이미 가입한 ID로는 계정을 생성할 수 없다.', async () => {
        //given
        const agent = request.agent(app.getHttpServer());

        //when
        await agent.post('/api/admin/login').send(loginAdminDto);
        const response = await agent
          .post('/api/admin/register')
          .send(registerAdminDto);

        //then
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('이미 존재하는 아이디입니다.');
      });

      it('관리자가 로그아웃 상태면 401 UnAuthorized 예외가 발생한다.', async () => {
        //given
        const registerAdminDto: RegisterAdminDto = {
          loginId: 'testNewAdminId',
          password: 'testNewAdminPassword!',
        };

        const agent = request.agent(app.getHttpServer());

        //when
        const response = await agent
          .post('/api/admin/register')
          .send(registerAdminDto);

        //then
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('인증되지 않은 요청입니다.');
      });
    });
  });

  describe('POST api/admin/sessionId', () => {
    describe('관리자가 로그인 상태임을 확인한다.', () => {
      it('쿠키의 session id로 관리자가 현재 로그인 상태인지 판단한다.', async () => {
        //given
        const agent = request.agent(app.getHttpServer());

        //when
        await agent.post('/api/admin/login').send(loginAdminDto);
        const response = await agent.get('/api/admin/sessionId');

        //then
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('정상적인 sessionId 입니다.');
      });

      it('session id가 일치하지 않는다면 401 UnAuthorized 예외가 발생한다.', async () => {
        //given
        const randomUUID = uuidv4();

        //when
        const response = await request(app.getHttpServer())
          .get('/api/admin/sessionId')
          .set('Cookie', [`sessionId=${randomUUID}`]);

        //then
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('인증되지 않은 요청입니다.');
      });

      it('session id가 없다면 401 UnAuthorized 예외가 발생한다.', async () => {
        //when
        const response = await request(app.getHttpServer())
          .get('/api/admin/sessionId')
          .set('Cookie', [`sessionId=`]);

        //then
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('인증되지 않은 요청입니다.');
      });
    });
  });
});

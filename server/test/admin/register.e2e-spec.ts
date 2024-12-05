import { INestApplication } from '@nestjs/common';
import { AdminService } from '../../src/admin/admin.service';
import { LoginAdminDto } from '../../src/admin/dto/login-admin.dto';
import { RegisterAdminDto } from '../../src/admin/dto/register-admin.dto';
import * as request from 'supertest';

describe('POST api/admin/register E2E Test', () => {
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

    await adminService.createAdmin(loginAdminDto);
  });

  it('관리자가 로그인되어 있으면 다른 관리자 계정 회원가입을 할 수 있다.', async () => {
    //given
    const agent = request.agent(app.getHttpServer());

    //when
    await agent.post('/api/admin/login').send(loginAdminDto);
    const response = await agent
      .post('/api/admin/register')
      .send(registerAdminDto);

    //then
    expect(response.status).toBe(201);
  });

  it('이미 가입한 ID를 입력하면 관리자 계정을 생성할 수 없다.', async () => {
    //given
    const agent = request.agent(app.getHttpServer());

    //when
    await agent.post('/api/admin/login').send(loginAdminDto);
    const response = await agent
      .post('/api/admin/register')
      .send(registerAdminDto);

    //then
    expect(response.status).toBe(409);
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
  });
});

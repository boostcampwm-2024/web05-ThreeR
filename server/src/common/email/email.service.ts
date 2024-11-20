import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { WinstonLoggerService } from '../logger/logger.service';

@Injectable()
export class EmailService {
  private transporter;
  private emailUser;

  constructor(
    configService: ConfigService,
    private readonly logger: WinstonLoggerService,
  ) {
    this.emailUser = configService.get<string>('EMAIL_USER');
    const emailPassword = configService.get<string>('EMAIL_PASSWORD');
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.emailUser,
        pass: emailPassword,
      },
    });
  }

  async sendMail(to: string, clientName: string, approveFlag: boolean) {
    try {
      const { subject, content } = this.createEmail(clientName, approveFlag);
      await this.transporter.sendMail({
        from: `Denamu<${this.emailUser}>`,
        to: `${clientName}<${to}>`,
        subject: subject,
        text: content, // 현재는 plain text를 사용하여 메일을 보내고 있지만,  html: xxx를 활용하여 html을 전송할 수도 있음.
      });
      this.logger.log(`${to} 주소로 메일이 전송되었습니다`);
    } catch (error) {
      this.logger.error(
        `${to} 주소로 메일 전송 중 오류가 발생했습니다: ${error}`,
      );
    }
  }

  private createEmail(clientName: string, approveFlag: boolean) {
    const result = approveFlag ? `승인` : `거부`;

    return {
      subject: `RSS 등록이 ${result}되었습니다.`,
      content: `${clientName}님의 RSS 등록이 ${result}되었습니다.`,
    };
  }
}

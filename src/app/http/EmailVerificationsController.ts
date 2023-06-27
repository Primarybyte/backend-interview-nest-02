import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmailModel } from '../../database/models/EmailModel';
import { EmailVerificationModel } from '../../database/models/EmailVerificationModel';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import * as undici from 'undici';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: '/email-verifications',
})
export class EmailVerificationsController {
  constructor(
    private configService: ConfigService,
    private sequelize: Sequelize,
    @InjectModel(EmailModel) private emailsRepository: typeof EmailModel,
    @InjectModel(EmailVerificationModel) private emailsVerificationRepository: typeof EmailVerificationModel,
  ) {
  }

  @Get('/')
  async getAll() {
    const sql = `
      SELECT email_verification.*, email.email
      FROM email_verification
      JOIN email ON email.id = email_verification.email_id
      ORDER BY email.last_verified_at`;

    const results = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });

    return results;
  }

  @Post('/')
  async create(@Body() body: any) {
    const prospectConfig = {
      baseUrl: this.configService.get('PROSPECT_BASE_URL'),
      apiKey: this.configService.get('PROSPECT_API_KEY'),
    };

    const res = await undici.request(prospectConfig.baseUrl + '/api/v1/email-verifier', {
      method: 'POST',
      body: JSON.stringify({
        email: [body.email[0]],
      }),
      headers: {
        'Authorization': 'Bearer ' + prospectConfig.apiKey,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.body.json();
    const verified = data.result[0];

    const emailModel = await this.emailsRepository.create({
      email: body.email[0],
    });

    const emailVerificationModel = await this.emailsVerificationRepository.create({
      email_id: emailModel.id,
      result: verified.result,
    });

    return {
      email: emailModel.email,
      result: emailVerificationModel.result,
    };
  }
}

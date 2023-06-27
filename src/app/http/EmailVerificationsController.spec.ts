import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../AppModule';
import { TestDatabaseModule } from '../../database/TestDatabaseModule';
import { TestRedisModule } from '../../redis/TestRedisModule';
import { EmailVerificationsController } from './EmailVerificationsController';
import { Sequelize } from 'sequelize-typescript';
import { EmailModel } from '../../database/models/EmailModel';
import { EmailVerificationModel } from '../../database/models/EmailVerificationModel';

describe('EmailVerificationsController', () => {
  let app: TestingModule;
  let controller: EmailVerificationsController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule, TestDatabaseModule, TestRedisModule],
    }).compile();

    await app.init();

    controller = app.get(EmailVerificationsController);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('getAll', () => {
    it('should return items from database', async () => {
      await app.get(Sequelize).getRepository(EmailModel).create({
        id: 1,
        email: 'test@example.com',
      });

      await app.get(Sequelize).getRepository(EmailVerificationModel).create({
        email_id: 1,
        result: 'valid',
      });

      const result = await controller.getAll();

      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          email: 'test@example.com',
          result: 'valid',
        }),
      ]));
    });
  });
});

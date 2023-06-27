import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './HealthController';

describe('AppController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = app.get(HealthController);
  });

  describe('root', () => {
    it('should return ok status', () => {
      expect(healthController.getStatus()).toStrictEqual({ status: 'healthy' });
    });
  });
});

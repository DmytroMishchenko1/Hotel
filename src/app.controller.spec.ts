import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it.only(`should return task description`, () => {
      expect(appController.getTaskInfo()).toBe(`<h1>An endpoint that returns a list of hotels near given coordinates (e.g. 48.130323,11.576362)</h1><h1>An endpoint to create a new booking for a given hotel</h1><h1>An endpoint to list bookings for a given hotel (no authentication needed)</h1>`);
    });
  });
});

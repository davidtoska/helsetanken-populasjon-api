import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const testId = '01043701319';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/test-personnummer (GET)', () => {
    return request(app.getHttpServer())
      .get('/test-personnummer')
      .expect(200)
      .then(v => {
        expect(Array.isArray(v.body));
        expect(typeof v.body[0] === 'string');
      });
  });

  it('/tenor-data (GET)', () => {
    return request(app.getHttpServer())
      .get('/tenor-data')
      .expect(200)
      .then(v => {
        expect(Array.isArray(v.body));
      });
  });

  it('/tenor-data/:testId (GET)', () => {
    return request(app.getHttpServer())
      .get('/tenor-data/' + testId)
      .expect(200)
      .then(v => {
        expect(v.body).toBeDefined();
        expect(v.body['identifikasjonsnummer']).toBeDefined();
      });
  });

  it('/synthea-data/:testId (GET)', () => {
    return request(app.getHttpServer())
      .get('/synthea-data/' + testId)
      .expect(200)
      .then(v => {
        expect(v.body).toBeDefined();
        expect(v.body['type']).toEqual('transaction');
      });
  });

  it('/synthea-data/:non-excisting gives 404 (GET)', () => {
    return request(app.getHttpServer())
      .get('/synthea-data/not-exsisting-id')
      .expect(404);
  });
});

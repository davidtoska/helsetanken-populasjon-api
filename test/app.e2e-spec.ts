import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { assert } from 'console';

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
        const body = v.body;
        const js = JSON.parse(body);
        console.log(js);
        assert(Array.isArray(v.body));
      });
  });

  it('/tenor-data (GET)', () => {
    return request(app.getHttpServer())
      .get('/tenor-data')
      .expect(200)
      .then(v => {
        assert(Array.isArray(v.body));
      });
  });

  it.only('/tenor-data/:p1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/tenor-data/p1')
      .expect(200)
      .then(v => {
        console.log(v.body);

        assert(v.body['identifikasjonsnummer'] === null);
      });
  });

  it.only('/synthea-data/:personnummer (GET)', () => {
    return request(app.getHttpServer())
      .get('/synthea-data/01011450055')
      .expect(200)
      .then(v => {
        console.log(v.body);

        assert(v.body['identifikasjonsnummer'] === null);
      });
  });
});

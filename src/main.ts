import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Helsetanken populasjon')
    .setDescription(
      'API som leverer syntetiske helsedata til 30 test-personer hentet fra tenors syntetiske folkeregister.',
    )
    .setVersion('0.0.1')
    // .addTag('syntetiske helsedata')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();

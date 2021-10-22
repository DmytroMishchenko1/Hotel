import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const options = new DocumentBuilder().setTitle('Hotel API').setDescription('Hotel API from HERE API').setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.APP_PORT || 5000);
}
bootstrap();

import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { AppModule } from './app.module'
// import { LoggerService } from './logger/logger.service'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  // use custom exception filter
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))

  // make logger global ?
  // app.useLogger(app.get(LoggerService))

  // custom prefix
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Nest POC')
    .setVersion('1.0')
    .addTag('API Endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // cors TODO: add local origins
  // app.enableCors(); 
  
  await app.listen(3000)
}
bootstrap()

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



export const SwaggerConnect=(app:INestApplication)=>{
const swaggerConfig = new DocumentBuilder()
    .setTitle('task softwaremeta')
    .setDescription('API documentation for softwaremeta')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter access token',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: 'api-docs-json',
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'task softwareMetaDocs',
  });
}

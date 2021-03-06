import { Module } from '@nestjs/common';
import { MusicsModule } from './musics/musics.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesModule } from './categories/categories.module';
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module';
import { EmailConfirmationModule } from './emailConfirmation/emailConfirmation.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        UPLOADS_PATH: Joi.string().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        JWT_RECOVERY_SECRET: Joi.string().required(),
        JWT_RECOVERY_EXPIRATION_TIME: Joi.string().required()
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    MusicsModule,
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    PlaylistsModule,
    FilesModule,
    CategoriesModule,
    EmailConfirmationModule,
    PasswordRecoveryModule,
    UsersModule,
    AuthorsModule
  ]
})
export class AppModule {}

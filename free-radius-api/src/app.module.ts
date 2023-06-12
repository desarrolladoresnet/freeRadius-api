import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './sequeelize/databse.module';
import { userProviders } from './sequeelize/user/user.providers';
import { radcheckProvider } from './sequeelize/rasdusercheck/radusercheck.provider';
import { userGroupProviders } from './sequeelize/radusergroup/usergroup.providers';
import { AppGetService } from './appGet.service';
import { AppPutService } from './appPut.service';

/**
 * Modulo principal de la aplicacion. Se injectan todas las depedencias, servicios y modulos necesarios.
 */
@Module({
  imports: [
    // PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppGetService,
    AppPutService,
    ...userProviders,
    ...radcheckProvider,
    ...userGroupProviders,
  ],
})
export class AppModule {}

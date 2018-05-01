import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';
import { PersistService } from '../services/persist.service';

import { TokenInterceptor } from '../auth/token.interceptor';
import { UnauthorizedInterceptor } from '../auth/unauthorized.interceptor';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    ConfigService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
    AuthService,
    PersistService
  ]
})
export class AppModule {}

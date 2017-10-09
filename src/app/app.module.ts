import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { SignUpPage } from '../pages/sign-up/sign-up';

import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { AppConfig }  from '../configure/config';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserPage,
    SignUpPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserPage,
    SignUpPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AppConfig,
  ]
})
export class AppModule {}

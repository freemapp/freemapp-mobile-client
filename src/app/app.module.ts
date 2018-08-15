import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import Amplify from 'aws-amplify';

import { MyApp } from './app.component';
import { LandingPage } from '../pages/landing/landing';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from '../components/components.module';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ResetPage } from '../pages/reset/reset';
import { ActivatePage } from '../pages/activate/activate';
import { ProfilePage } from '../pages/profile/profile';
import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    LandingPage,
    SignInPage,
    SignUpPage,
    ResetPage,
    ActivatePage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    SignInPage,
    SignUpPage,
    ResetPage,
    ActivatePage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DataProvider
  ]
})
export class AppModule {
  constructor() {
    this.configureAWS();
  }

  configureAWS() {
    Amplify.configure({
      Auth: {
        userPoolId: 'us-east-2_fqAuwBWRH',
        userPoolWebClientId: '3ttub163m610h56o9vvrfurebt',
        region: 'us-east-2'
      },
      API: {
        endpoints: [{
            name: "subscribers",
            endpoint: "https://dbep3uy1fc.execute-api.us-east-2.amazonaws.com/dev"
          }, {
            name: "services",
            endpoint: "https://brblt7abh0.execute-api.us-east-2.amazonaws.com/dev"
          }]
      }
    });
    // Amplify.configure(aws_exports);
  }
}

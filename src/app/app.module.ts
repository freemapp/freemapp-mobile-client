import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import Amplify from 'aws-amplify';

import { MyApp } from '@fma_app/app.component';
import { LandingPage } from '@fma_pages/landing/landing';
import { ComponentsModule } from '@fma_components/components.module';
import { SignInPage } from '@fma_pages/sign-in/sign-in';
import { SignUpPage } from '@fma_pages/sign-up/sign-up';
import { ResetPage } from '@fma_pages/reset/reset';
import { ActivatePage } from '@fma_pages/activate/activate';
import { ProfilePage } from '@fma_pages/profile/profile';
import { AuthProvider } from '@fma_providers/auth/auth';
import { DataProvider } from '@fma_providers/data/data';
import { ServiceSubcribersPage } from '@fma_pages/service-subcribers/service-subcribers';
import { MediaProvider } from '@fma_providers/media/media';

@NgModule({
  declarations: [
    MyApp,
    LandingPage,
    SignInPage,
    SignUpPage,
    ResetPage,
    ActivatePage,
    ProfilePage,
    ServiceSubcribersPage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__freemapp_mobile',
      driverOrder: ['localstorage']//['indexeddb', 'sqlite', 'websql']
    }),
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
    ProfilePage,
    ServiceSubcribersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    DataProvider,
    MediaProvider
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

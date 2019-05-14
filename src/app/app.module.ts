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
import { APIGatewayProvider } from '@fma_providers/api-gateway/api-gateway';
import { ServiceSubcribersPage } from '@fma_pages/service-subcribers/service-subcribers';
import { MediaProvider } from '@fma_providers/media/media';
import { ImagePicker } from '@ionic-native/image-picker';
import { ENV } from '@fma_env';

class ImagePickerMock extends ImagePicker {

  getPictures(options) {
    if (ENV.isDebug)
      return this.loadFile();

    else
      return this.getPictures(options);
  }

  loadFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        var result = {
          mime: xhr.response.type,
          size: xhr.response.size
        };
        var reader = new FileReader();
        reader.onload = () => {
          result['data'] = reader.result;

          resolve(result);
        };
        reader.onerror = () => {
          result['error'] = reader.error;

          reject(result);
        };
        // reader.readAsDataURL(xhr.response); // base64
        reader.readAsBinaryString(xhr.response); // raw
        // reader.readAsText(xhr.response, 'ansi'); // raw
      };
      xhr.open('GET', '../assets/imgs/icon.png');
      xhr.send();
    });
  }

}

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
    { provide: ImagePicker, useClass: ImagePickerMock },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    APIGatewayProvider,
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
      // API: {
      //   endpoints: [{
      //       name: "subscribers",
      //       endpoint: "https://dbep3uy1fc.execute-api.us-east-2.amazonaws.com/dev"
      //     }, {
      //       name: "services",
      //       endpoint: "https://brblt7abh0.execute-api.us-east-2.amazonaws.com/dev"
      //     }]
      // }
    });
    // Amplify.configure(aws_exports);
  }
}

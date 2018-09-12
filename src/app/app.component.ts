import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Page } from '../../node_modules/ionic-angular/umd/navigation/nav-util';
import { LandingPage } from '../pages/landing/landing';
import { SignInPage } from '../pages/sign-in/sign-in';
import { ProfilePage } from '../pages/profile/profile';
import { AuthProvider } from '../providers/auth/auth';
import { Observable, Subject } from 'rxjs';

type MenuPage = {
  name: string,
  page: Page,
  icon: string,
  polarity?: number
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LandingPage;

  pages: Array<MenuPage>
  pagesObservable: Observable<MenuPage[]>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private auth: AuthProvider) {

    let pages: Array<MenuPage> = [
      { name: 'home', page: LandingPage, icon: 'md-home' },
      { name: 'sign-in', page: SignInPage, icon: 'md-key', polarity: -1 },
      { name: 'profile', page: ProfilePage, icon: 'md-person', polarity: 1 }];

    this.pages = pages;
    this.pagesObservable = Observable.of(pages);

    this.auth.credsChanged.subscribe(creds => this.filterPages(creds));
    this.auth.getCreds().then(creds => this.filterPages(creds));

    this.initializeApp();
  }

  filterPages(creds?: any): void {
    let visiblePages: MenuPage[] = this.pages.filter((page: MenuPage) => {
      let polarity: number = page.polarity;
      let repulsive: boolean = polarity < 0;
      let attractive: boolean = polarity > 0;

      if (repulsive) {
        return !creds;
      }
      else if (attractive) {
        return !!creds;
      }
      else
        return true;
    });

    this.pagesObservable = Observable.of(visiblePages);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: Page) {
    // if (this.nav.root !== page)
      this.nav.setRoot(page);
  }
}

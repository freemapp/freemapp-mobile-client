import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LandingPage } from '@fma_pages/landing/landing';
import { SignInPage } from '@fma_pages/sign-in/sign-in';
import { ProfilePage } from '@fma_pages/profile/profile';
import { AuthProvider } from '@fma_providers/auth/auth';
import { Observable } from 'rxjs';
import { ENV } from '@fma_env';

type MenuAction = {
  name: string,
  action: any,
  icon: string,
  polarity?: number
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  isDebug: boolean;
  rootPage: any;

  menuActions: Array<MenuAction>
  menuActionsObservable: Observable<MenuAction[]>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public auth: AuthProvider) {

    let pages: Array<MenuAction> = [{
        name: 'home',
        action: () => this.openPage(LandingPage),
        icon: 'home'
      }, {
        name: 'sign-in',
        action: () => this.openPage(SignInPage),
        icon: 'log-in',
        polarity: -1
      }, {
        name: 'profile',
        action: () => this.openPage(ProfilePage),
        icon: 'person',
        polarity: 1
      }, {
        name: 'sign-out',
        action: () => this.auth.signOut(),
        icon: 'log-out',
        polarity: 1
      }];

    this.menuActions = pages;
    this.menuActionsObservable = Observable.of(pages);

    this.auth.credsChanged.subscribe(creds => this.filterPages(creds));
    this.auth.getCreds().then(creds => this.filterPages(creds));

    this.isDebug = ENV.isDebug;
    this.rootPage = LandingPage;

    this.initializeApp();
  }

  filterPages(creds?: any): void {
    let visiblePages: MenuAction[] = this.menuActions.filter((menuAction: MenuAction) => {
      let polarity: number = menuAction.polarity;
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

    this.menuActionsObservable = Observable.of(visiblePages);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getMenuAction(menuAction: MenuAction): any {
    if (typeof menuAction.action === 'function')
      return menuAction.action();

    else
      return this.openPage(menuAction.action);
  }

  openPage(page: any): Promise<any> {
    // if (this.nav.root !== page)
      return this.nav.setRoot(page);
  }
}

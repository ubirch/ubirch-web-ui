import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment';
import { combineLatest, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { AccountInfo } from './models/account-info';
import { KeycloakService } from 'keycloak-angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages$ = combineLatest(
    from(this.keycloackService.isLoggedIn()),
    this.userService.observableAccountInfo,
  ).pipe(map(([isLoggedIn, account]: [boolean, AccountInfo]) => {
    const items = [
      {
        titleKey: 'menu.main.home',
        url: '/home',
        icon: 'home.svg',
        authOnly: true
      },
      {
        titleKey: 'menu.main.things',
        url: '/devices',
        icon: 'list.svg',
        authOnly: true
      },
      {
        titleKey: 'menu.main.verification',
        url: '/verification',
        icon: 'checkmark-circle-outline.svg'
      },
      {
        titleKey: 'menu.main.import',
        url: '/import',
        icon: 'push.svg',
        authOnly: true,
        adminOnly: true
      },
      {
        titleKey: 'menu.main.logout',
        url: '/logout',
        icon: 'logout.svg',
        authOnly: true
      }
    ];

    return items.filter(link => {
      if (!isLoggedIn && link.authOnly) {
        return false;
      }

      if ((!account || !account.isAdmin) && link.adminOnly) {
        return false;
      }

      return true;
    });
  }));

  clientName = environment.client_name || 'Mandant';
  addClientNameToLogo = environment.client_name || false;

  clientLogoFileName = environment.client_logo_filename || 'logo.svg';
  clientLogoPath = '/assets/client/images/' + this.clientLogoFileName;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private keycloackService: KeycloakService,
    private translate: TranslateService
  ) {
    this.initializeApp();
    translate.setDefaultLang('en');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log(`version: ${environment.version}`);
      console.log(`mode: ${environment.envName}`);
    });
  }
}

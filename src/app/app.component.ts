import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment';
import { map } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { AccountInfo } from './models/account-info';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages$ = this.userService.observableAccountInfo.pipe(map((account: AccountInfo) => {
    const items = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home.svg'
      },
      {
        title: 'Things',
        url: '/devices',
        icon: 'list.svg'
      },
      {
        title: 'Verification',
        url: '/verification',
        icon: 'checkmark-circle-outline.svg'
      },
      {
        title: 'Logout',
        url: '/logout',
        icon: 'logout.svg'
      }
    ];

    if (account && account.isAdmin) {
      items.splice(
        3,
        0,
        {
          title: 'Import',
          url: '/import',
          icon: 'push.svg'
        },
      );
    }

    return items;
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
  ) {
    this.initializeApp();
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

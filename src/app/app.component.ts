import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
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

  clientName = environment.client_name || 'Mandant';
  addClientNameToLogo = environment.client_name || false;

  clientLogoFileName = environment.client_logo_filename || 'logo.svg';
  clientLogoPath = '/assets/client/images/' + this.clientLogoFileName;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('version 0.4.2');
    });
  }
}

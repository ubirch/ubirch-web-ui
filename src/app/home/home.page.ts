import { Component } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
      private keycloakService: KeycloakService ) { }

  doLogout() {
    this.keycloakService.logout();
  }

  onLoad(event) {
    console.log('client description loaded');
  }

  onError(event) {
    console.log('Error loading client description');
  }
}

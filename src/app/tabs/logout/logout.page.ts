import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
      private keycloakService: KeycloakService
  ) { }

  ngOnInit() {
  }

  doLogout() {
    this.keycloakService.logout();
  }
}

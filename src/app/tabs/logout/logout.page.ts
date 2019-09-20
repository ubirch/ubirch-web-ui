import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {HeaderActionButton} from '../../components/header/header-action-button';
import {Location} from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
      private keycloakService: KeycloakService,
      private location: Location
  ) { }

  actionButtons = [new HeaderActionButton({
    color: 'dark',
    label: 'Back',
    iconPath: 'assets/app-icons/back-button.svg',
    action: 'historyBack'
  })];
  username = 'Max Mustermann';

  ngOnInit() {
  }

  handleButtonClick(action: string) {
    switch (action) {
      case 'historyBack':
        this.location.back();
        break;
    }
  }

  doLogout() {
    this.keycloakService.logout();
  }
}

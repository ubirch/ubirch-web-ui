import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {HeaderActionButton} from '../../components/header/header-action-button';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
      private keycloakService: KeycloakService,
      private location: Location,
      private userService: UserService
  ) { }

  actionButtons = [new HeaderActionButton({
    color: 'dark',
    labelKey: 'action-button.back',
    iconPath: 'assets/app-icons/back-button.svg',
    action: 'historyBack'
  })];

  ngOnInit() {}

  handleButtonClick(action: string) {
    switch (action) {
      case 'historyBack':
        this.location.back();
        break;
    }
  }

  doLogout() {
    this.keycloakService
      .logout()
      .then(_ =>
        this.userService.resetAccountInfo()
      );
  }
}

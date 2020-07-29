import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ToastController} from '@ionic/angular';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'ubirch-web-ui-logged-in-user',
  templateUrl: './logged-in-user.component.html',
  styleUrls: ['./logged-in-user.component.scss'],
})
export class LoggedInUserComponent implements OnInit {

  username: string;
  isLoggedIn = false;

  constructor(
    private toastCtrl: ToastController,
    private userService: UserService,
    private keycloakService: KeycloakService,
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  private async getUserData() {
    if (!await this.keycloakService.isLoggedIn()) {
      this.isLoggedIn = false;
      return;
    }

    this.isLoggedIn = true;

    this.userService.observableAccountInfo.subscribe(accountInfo => {
      if (accountInfo) {
        this.username = accountInfo.user.toString();
      } else {
        this.userService.getAccountInfo().subscribe(
          _ => {},
          error => this.handleError(error)
        );
      }
    });
  }
  handleError(error: Error) {
    const errorContent = {
      message: 'Error occurred',
      duration: 10000,
      color: 'danger'
    };
    this.toastCtrl.create(errorContent).then(toast => toast.present());
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ToastController} from '@ionic/angular';
import {KeycloakService} from 'keycloak-angular';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ubirch-web-ui-logged-in-user',
  templateUrl: './logged-in-user.component.html',
  styleUrls: ['./logged-in-user.component.scss'],
})
export class LoggedInUserComponent implements OnInit, OnDestroy {

  username: string;
  isLoggedIn = false;
  private accountSubsc: Subscription;
  private accountSubsc2: Subscription;

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

    this.accountSubsc = this.userService.observableAccountInfo.subscribe(accountInfo => {
      if (accountInfo) {
        this.username = accountInfo.user.toString();
      } else {
        this.accountSubsc2 = this.userService.getAccountInfo().subscribe(
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

  ngOnDestroy(): void {
    if (this.accountSubsc) {
      this.accountSubsc.unsubscribe();
    }
    if (this.accountSubsc2) {
      this.accountSubsc2.unsubscribe();
    }
  }
}

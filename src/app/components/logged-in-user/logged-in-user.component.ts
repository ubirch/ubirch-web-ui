import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {KeycloakService} from 'keycloak-angular';
import {Subscription} from 'rxjs';
import {ToastService} from '../../services/toast.service';
import {ToastType} from '../../enums/toast-type.enum';

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
    private toast: ToastService,
    private userService: UserService,
    private keycloakService: KeycloakService,
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  private async getUserData() {
    // Force the user to log in if currently unauthenticated.
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
    this.toast.openToast(ToastType.danger, 'error.user.not-logged_in');
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

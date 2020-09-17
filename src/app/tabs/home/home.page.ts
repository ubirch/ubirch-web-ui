import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderActionButton} from '../../components/header/header-action-button';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private accountInfoSubscr: Subscription;
  private accountInfoSubscr2: Subscription;

  constructor(
      private userService: UserService
  ) { }

  actionButtons = [
//    new HeaderActionButton({
//      color: 'dark',
//     labelKey: 'action-button.change-user-profile',
//      iconName: 'settings',
//      action: 'changeUserProfile'
//    })
  ];
  activeDevices = 0;

  handleButtonClick(action: string) {
    switch (action) {
      case 'changeUserProfile':
        console.log('changeUserProfile: NOT YET IMPLEMENTED!!!!');
        break;
    }
  }

  ngOnInit(): void {
    this.accountInfoSubscr = this.userService.observableAccountInfo.subscribe(accountInfo => {
      if (accountInfo) {
        this.activeDevices = accountInfo.numberOfDevices;
      } else {
        this.accountInfoSubscr2 = this.userService.getAccountInfo().subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.accountInfoSubscr) {
      this.accountInfoSubscr.unsubscribe();
    }
    if (this.accountInfoSubscr2) {
      this.accountInfoSubscr2.unsubscribe();
    }
  }

}

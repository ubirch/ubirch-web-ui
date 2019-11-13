import {Component, OnInit} from '@angular/core';
import {HeaderActionButton} from '../../components/header/header-action-button';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
      private userService: UserService
  ) { }

  actionButtons = [
//    new HeaderActionButton({
//      color: 'dark',
//     label: 'Change User Profile',
//      iconName: 'settings',
//      action: 'changeUserProfile'
//    })
  ];
  activeDevices = 0;
  username = '';

  handleButtonClick(action: string) {
    switch (action) {
      case 'changeUserProfile':
        console.log('changeUserProfile: NOT YET IMPLEMENTED!!!!');
        break;
    }
  }

  ngOnInit(): void {
    this.userService.observableAccountInfo.subscribe(accountInfo => {
      if (accountInfo) {
        this.username = accountInfo.user.toString();
        this.activeDevices = accountInfo.numberOfDevices;
        this.userService.userEntered();
      } else {
        this.userService.getAccountInfo().subscribe();
      }
    });
  }

}

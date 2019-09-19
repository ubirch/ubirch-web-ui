import { Component } from '@angular/core';
import {HeaderActionButton} from '../../components/header/header-action-button';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
  ) { }

  actionButtons = [new HeaderActionButton({
    color: 'dark',
    label: 'Change User Profile',
    iconName: 'settings',
    action: 'changeUserProfile'
  })];
  activeDevices = 42;
  username = 'Max Mustermann';

  handleButtonClick(action: string) {
    switch (action) {
      case 'changeUserProfile':
        console.log('changeUserProfile: NOT YET IMPLEMENTED!!!!');
        break;
    }
  }
}

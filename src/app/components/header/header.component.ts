import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HeaderActionButton} from './header-action-button';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'ubirch-web-ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title = '';
  @Input() actionButtons: HeaderActionButton[] = [];
  @Input() headerRightLabel = '';
  @Input() headerRightValue: string;
  @Input() addSearchBarWithPlaceholder: string;
  @Input() searchOnEnter = false;
  @Input() showSearchCancelButton = false;
  @Output() buttonClicked = new EventEmitter<string>();
  @Output() startSearch = new EventEmitter<string>();

  username: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.observableAccountInfo.subscribe(accountInfo => {
      if (accountInfo) {
        this.username = accountInfo.user.toString();
      } else {
        this.userService.getAccountInfo().subscribe();
      }
    });
  }

  _buttonClicked(action: string) {
    this.buttonClicked.emit(action);
  }

  _startSearch(searchStr: any) {
    this.startSearch.emit(searchStr);
  }

}

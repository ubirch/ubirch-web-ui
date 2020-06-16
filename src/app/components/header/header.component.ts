import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HeaderActionButton} from './header-action-button';
import {UserService} from '../../services/user.service';
import {ToastController} from '@ionic/angular';
import {KeycloakService} from 'keycloak-angular';

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
  @Input() headerFullWidthLabel = '';
  @Input() headerFullWidthValue: string;
  @Input() addSearchBarWithPlaceholder: string;
  @Input() searchInput: string;
  @Input() searchOnEnter = false;
  @Input() showSearchCancelButton = 'never';
  @Input() fullWidthSearch = false;
  @Output() buttonClicked = new EventEmitter<string>();
  @Output() startSearch = new EventEmitter<string>();
  @Output() searchString = new EventEmitter<string>();

  username: string;

  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private toastCtrl: ToastController,
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

  _buttonClicked(action: string) {
    this.buttonClicked.emit(action);
  }

  _startSearch(searchStr: any) {
    this.startSearch.emit(searchStr);
  }

  _saveSearchString(searchStr: any) {
    this.searchString.emit(searchStr);
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

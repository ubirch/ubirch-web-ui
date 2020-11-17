import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {HeaderActionButton} from './header-action-button';

@Component({
  selector: 'ubirch-web-ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
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
  @ViewChild('SEARCHBAR') searchbar: any;

  constructor() {
  }
  // function to set focus on the searchbar, delay is needed in some cases when view isn't ready yet
  setFocus(delay) {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, delay);
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
}

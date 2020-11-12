import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {HeaderActionButton} from '../header-action-button';
import {BEDevice} from '../../../models/bedevice';

@Component({
  selector: 'ubirch-web-ui-verification-header',
  templateUrl: './verification-header.component.html',
  styleUrls: ['./verification-header.component.scss'],
})
export class VerificationHeaderComponent implements AfterViewChecked {
  @Input() title = 'Verification';
  @Input() currentDevice: BEDevice;

  @Input() actionButtons: HeaderActionButton[] = [];
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

  ngAfterViewChecked() {
   this.searchbar.setFocus();
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

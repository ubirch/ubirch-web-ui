import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HeaderActionButton} from './header-action-button';

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
  @Output() buttonClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  _buttonClicked(action: string) {
    this.buttonClicked.emit(action);
  }

}

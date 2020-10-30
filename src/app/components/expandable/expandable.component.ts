import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('final', style({
        overflow: 'hidden'
      })),
      transition('initial<=>final', animate('250ms'))
    ]),
    trigger('rotatedState', [
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(180deg)'})),
      transition('default <=> rotated', animate('250ms'))
    ])
  ]
})
export class ExpandableComponent implements OnInit {

  @Input() title: string;
  @Output() toggled = new EventEmitter<boolean>();

  showBody = false;
  arrowUrl = '';
  iconPath = 'assets/app-icons/';
  expanded = false;


  constructor() {
  }

  ngOnInit() {
  }

  toggle() {
    this.showBody = !this.showBody;
    this.expanded = !this.expanded;
    this.toggled.emit(this.showBody);
  }
}

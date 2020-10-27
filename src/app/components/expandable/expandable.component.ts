import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {TrustService} from "../../services/trust.service";

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
      state('default', style({ transform: 'rotate(0)'})),
      state('rotated', style({ transform: 'rotate(180deg)'})),
      transition('default <=> rotated', animate('250ms'))
    ])
  ]
})
export class ExpandableComponent implements OnInit {

  @Input() title: object;
  showBody = false;
  arrowUrl = '';
  iconPath = TrustService.BlockchainIconsPath;
  expanded = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.showBody = !this.showBody;
    this.expanded = !this.expanded;
  }

}
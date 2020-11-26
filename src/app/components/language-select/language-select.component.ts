import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss'],
})
export class LanguageSelectComponent implements OnInit {

  constructor(private translateService: TranslateService) {}
  showLanSelect = false;
  languages: string[];

  ngOnInit() {
    this.languages = this.translateService.getLangs();
  }

}

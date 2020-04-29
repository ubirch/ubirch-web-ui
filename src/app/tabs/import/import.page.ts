import { Component, OnInit } from '@angular/core';
import { ImportDeviceFormData } from './components/import-form/import-form.component';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  formSubmit(value: ImportDeviceFormData) {
    console.log(value);
  }
}

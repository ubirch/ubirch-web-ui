import { Component, OnInit } from '@angular/core';
import { ImportDeviceFormData } from './components/import-form/import-form.component';
import { DeviceImportService } from 'src/app/services/device-import.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public error$: BehaviorSubject<any> = new BehaviorSubject(null);
  public fileSizeLimit = 164000000;

  constructor(private deviceImportService: DeviceImportService) { }

  ngOnInit() {
  }

  formSubmit(value: ImportDeviceFormData): void {
    const formData = this.valueToFormData(value);
    this.loading$.next(true);
    this.error$.next(null);
    this.deviceImportService.importDevice(formData).subscribe(
      () => {
        this.loading$.next(false);
      },
      (err) => {
        this.loading$.next(false);
      }
    );
  }

  private valueToFormData(value: ImportDeviceFormData): FormData {
    const formData = new FormData();
    Object.keys(value).forEach(key => {
      formData.append(key, value[key]);
    });

    return formData;
  }
}

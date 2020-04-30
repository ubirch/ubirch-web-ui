import { Component, OnInit } from '@angular/core';
import { ImportDeviceFormData } from './components/import-form/import-form.component';
import { DeviceImportService } from 'src/app/services/device-import.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {
  public rowsCountLimit = 100000;
  public rowSize = 1640;
  public headerRowSize = 17;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private error$: BehaviorSubject<any> = new BehaviorSubject(null);

  public errorMessages$: Observable<string[]> = this.error$.pipe(
    map((error) => {
      if (!error) {
        return [];
      }

      if (error.error && error.error.error) {
        return [error.error.error.message];
      }

      return [(error as Error).message]
    }),
  );

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
      (error: Error) => {
        this.loading$.next(false);
        this.error$.next(error);
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

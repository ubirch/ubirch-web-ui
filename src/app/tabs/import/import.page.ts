import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ImportDeviceFormData } from './components/import-form/import-form.component';
import { DeviceImportService } from 'src/app/services/device-import.service';
import { DeviceImportResult } from 'src/app/models/device-import-result';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {
  /**
   * maxiumum rows in the file count
   */
  public rowsCountLimit = environment.deviceImport.default.maximumRowsCount;

  /**
   * file row size in bytes
   */
  public rowSize = environment.deviceImport.default.rowSizeBytes;

  /**
   * file header row size in bytes
   */
  public headerRowSize = environment.deviceImport.default.headerRowSizeBytes;

  /**
   * loading state
   */
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * error data
   */
  private error$: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   * import result
   */
  public result$: BehaviorSubject<DeviceImportResult> = new BehaviorSubject(null);

  /**
   * reset form event
   */
  public resetForm$: Subject<void> = new Subject();

  /**
   * transform error for the output
   */
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
    // transform value to FormData
    const formData = this.valueToFormData(value);

    // turn on spinner
    this.loading$.next(true);

    // clear errors
    this.error$.next(null);

    // clear results
    this.result$.next(null);

    // send import request with FormData
    this.deviceImportService.importDevice(formData).subscribe(
      (result: DeviceImportResult) => {
        // turn off spinner
        this.loading$.next(false);

        // show results
        this.result$.next(result);

        // clear form, if all the data is correct
        // otherwise, user should be able to, e.g., upload another
        // file without re-entering other form fields
        if (result.failures.length === 0) {
          this.resetForm$.next();
        }
      },
      (error: Error) => {
        // turn off spinner
        this.loading$.next(false);
        // show errors
        this.error$.next(error);
      }
    );
  }

  /**
   * transform import form value to FormData
   * @param value import form value
   */
  private valueToFormData(value: ImportDeviceFormData): FormData {
    const formData = new FormData();
    Object.keys(value).forEach(key => {
      formData.append(key, value[key]);
    });

    return formData;
  }
}

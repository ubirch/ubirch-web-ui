import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick, getTestBed, inject } from '@angular/core/testing';
import { timer, throwError } from 'rxjs';
import { take, map, delay, skipWhile } from 'rxjs/operators';

import { ImportPage } from './import.page';
import { ImportDeviceFormData } from './components/import-form/import-form.component';
import { DeviceImportService } from 'src/app/services/device-import.service';
import { DeviceImportResult } from 'src/app/models/device-import-result';

describe('ImportPage', () => {
  let component: ImportPage;
  let fixture: ComponentFixture<ImportPage>;
  let injector: TestBed;
  let nativeElement: HTMLElement;

  const formValue = new ImportDeviceFormData({
    file: new File([], 'test.csv'),
    skip_header: true,
    batch_type: 'sim_import',
    batch_provider: 'Test Provider',
    batch_description: 'Lorem ipsum dolor sit amet',
    batch_tags: 'lorem, ipsum, dolor, sit, amet'
  });

  const accepted = 100;
  const failure = 2;
  const failures = ['Failure 1', 'Failure 2'];
  const status = true;
  const success = 98;
  const response = { accepted, failure, failures, status, success };

  const mockImportService = {
    importDevice(_formData: FormData) {
      return timer(0).pipe(map(() => new DeviceImportResult(response)));
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: DeviceImportService,
          useValue: mockImportService,
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set loading to true on form submit', () => {
    component
      .loading$
      .pipe(take(1))
      .subscribe(loading => expect(loading).toBe(false));

    component.formSubmit(formValue);

    component
      .loading$
      .pipe(take(1))
      .subscribe(loading => expect(loading).toBe(true));
  });

  it('set loading to false on form submit success', fakeAsync(() => {
    component.formSubmit(formValue);
    tick();

    component
      .loading$
      .pipe(take(1))
      .subscribe(loading => expect(loading).toBe(false));
  }));

  it('set loading to false on form submit error', () => {
    const importService = injector.get(DeviceImportService);
    spyOn(importService, 'importDevice').and.returnValue(throwError(new Error()));

    component.formSubmit(formValue);

    component
      .loading$
      .pipe(take(1))
      .subscribe(loading => expect(loading).toBe(false));
  });

  it('set result to null on form submit', () => {
    component.result$.next(new DeviceImportResult(response));

    component.formSubmit(formValue);

    component
      .result$
      .pipe(take(1))
      .subscribe(result => expect(result).toBe(null));
  });

  it('set error to null on form submit', () => {
    component.error$.next(new Error('Test error'));

    component.formSubmit(formValue);

    component
      .error$
      .pipe(take(1))
      .subscribe(error => expect(error).toBe(null));
  });

  it('set result on form submit success', fakeAsync(() => {
    const importResult = new DeviceImportResult(response);
    component.formSubmit(formValue);

    tick();

    component
      .result$
      .pipe(take(1))
      .subscribe(result => expect(result).toEqual(importResult));
  }));

  it('handle form submit data error', () => {
    const message = 'Test error';
    const data = { error: { error_type: 'Test error', message } };
    const error = new Error();
    // @ts-ignore
    error.error = data;

    const output = [message];
    const importService = injector.get(DeviceImportService);
    spyOn(importService, 'importDevice').and.returnValue(throwError(error));

    component
      .errorMessages$
      .pipe(skipWhile(errors => !errors.length))
      .subscribe(errors => {
        expect(errors).toEqual(output)
      });

    component.formSubmit(formValue);
  });

  it('handle form submit server error', () => {
    const error = 'Server side error';
    const output = [error];
    const importService = injector.get(DeviceImportService);
    spyOn(importService, 'importDevice').and.returnValue(throwError(new Error(error)));

    component
      .errorMessages$
      .pipe(skipWhile(errors => !errors.length))
      .subscribe(errors => expect(errors).toEqual(output));

    component.formSubmit(formValue);
  });

  it('show spinner on form submit', () => {
    expect(nativeElement.querySelector('#import-spinner')).toBeNull();

    component.formSubmit(formValue);
    fixture.detectChanges();

    expect(nativeElement.querySelector('#import-spinner')).toBeTruthy();
  });

  it('hide spinner on form submit success', fakeAsync(() => {
    component.formSubmit(formValue);

    tick();
    fixture.detectChanges();

    expect(nativeElement.querySelector('#import-spinner')).toBeNull();
  }));

  it('hide spinner on form submit error', fakeAsync(() => {
    const importService = injector.get(DeviceImportService);
    spyOn(importService, 'importDevice').and.returnValue(throwError(new Error()));

    component.formSubmit(formValue);

    tick();
    fixture.detectChanges();

    expect(nativeElement.querySelector('#import-spinner')).toBeNull();
  }));

  it('show result on form submit success', fakeAsync(() => {
    expect(nativeElement.querySelector('#import-result-output')).toBeNull();
    component.formSubmit(formValue);

    tick();
    fixture.detectChanges();

    expect(nativeElement.querySelector('#import-result-output')).toBeTruthy();

    expect(nativeElement.querySelector('#import-accepted-output').innerHTML.trim()).toEqual(accepted.toString());
    expect(nativeElement.querySelector('#import-failure-output').innerHTML.trim()).toEqual(failure.toString());
    expect(nativeElement.querySelector('#import-success-output').innerHTML.trim()).toEqual(success.toString());

    const failuresList = nativeElement.querySelectorAll('[data-test-import-failure-output]');
    failuresList.forEach((element, index) => expect(element.innerHTML.trim()).toEqual(failures[index]));
  }));

  it('hide result on form submit', () => {
    const importResult = new DeviceImportResult(response);
    component.result$.next(importResult);

    component.formSubmit(formValue);

    fixture.detectChanges();
    expect(nativeElement.querySelector('#import-result-output')).toBeNull();
  });

  it('show form submit errors', () => {
    const error = 'Server side error';
    const importService = injector.get(DeviceImportService);
    spyOn(importService, 'importDevice').and.returnValue(throwError(new Error(error)));

    component
      .errorMessages$
      .pipe(skipWhile(errors => !errors.length))
      .subscribe(errors => {
        fixture.detectChanges();
        expect(nativeElement.querySelector('#import-error-output')).toBeTruthy();

        const errorsList = nativeElement.querySelectorAll('[data-test-import-error-output]');
        errorsList.forEach((element, index) => expect(element.innerHTML.trim()).toEqual(errors[index]));
      });

    component.formSubmit(formValue);
  });

  it('hide errors on form submit', () => {
    const error = new Error('Test error');
    component.error$.next(error);

    component.formSubmit(formValue);
    fixture.detectChanges();

    expect(nativeElement.querySelector('#import-error-output')).toBeNull();
  });
});

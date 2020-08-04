import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { ImportFormComponent, ImportDeviceFormData } from './import-form.component';
import { ComponentsModule } from 'src/app/components/components.module';

describe('ImportFormComponent', () => {
  let component: ImportFormComponent;
  let fixture: ComponentFixture<ImportFormComponent>;
  let form: FormGroup;
  let nativeElement: HTMLElement;

  const rowsCountLimit = 100;
  const rowSize = 100;
  const headerRowSize = 10;

  /**
   * rows count * row size + \n for each row + header size + \n for header row
   * 100        * 100      + 100             + 10          + 1                = 10111
   */
  const limitWithHeader = 10111;

  /**
   * rows count * row size + \n for each row
   * 100        * 100      + 100           = 10100
   */
  const limitWithoutHeader = 10100;

  /**
   * util object to be used instead of real `File` instance
   */
  const mockFile = { name: 'test.csv', size: limitWithoutHeader};

  /**
   * util object with form values different from default
   */
  const defaultFormValues = {
    file: mockFile,
    skip_header: true,
    batch_type: 'sim_import',
    batch_provider: 'Test provider',
    batch_description: 'Lorem ipsum dolor sit amet',
    batch_tags: 'lorem, ipsum, dolor, sit, amet'
  };

  /**
   * util function to fill each form control separately
   */
  function fillForm(formGroup: FormGroup, values?: object) {
    values = { ...defaultFormValues, ...values };

    Object.keys(values).forEach(key => {
      formGroup.get(key).setValue(values[key]);
    });
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportFormComponent ],
      imports: [IonicModule, FormsModule, ReactiveFormsModule, ComponentsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    form = component.importForm;
    nativeElement = fixture.nativeElement;

    // set component inputs
    // @ts-ignore
    component.rowsCountLimit = rowsCountLimit;
    // @ts-ignore
    component.rowSize = rowSize;
    // @ts-ignore
    component.headerRowSize = headerRowSize;

    const changes = {
      rowsCountLimit: new SimpleChange(null, rowsCountLimit, false),
      rowSize: new SimpleChange(null, rowSize, false),
      headerRowSize: new SimpleChange(null, headerRowSize, false),
    };

    // trigger OnChanges hook
    component.ngOnChanges(changes);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculate file size limit', () => {
    component.fileSizeBytes$.subscribe(v => expect(v).toEqual(limitWithHeader));
  });

  it('calculate file size limit', () => {
    component
      .fileSizeBytes$
      .pipe(take(1))
      .subscribe(v => expect(v).toEqual(limitWithHeader));

    form.get('skip_header').patchValue(true);

    component
      .fileSizeBytes$
      .pipe(take(1))
      .subscribe(v => expect(v).toEqual(limitWithoutHeader));
  });

  it('prettify file size limit', () => {
    component.fileSizePrettified$.subscribe(v => expect(v).toEqual(9));
  });

  it('update file size validation', fakeAsync(() => {
    const size = limitWithoutHeader + 1;
    const mockFile = { name: 'test.csv', size };

    const fileControl = form.get('file');
    const skipHeaderControl = form.get('skip_header');

    fileControl.setValue(mockFile);

    expect(fileControl.errors).toBeNull();

    skipHeaderControl.setValue(true);

    expect(fileControl.errors.fileMaxSize).toBe(true);
  }));

  it('reset form', () => {
    const reset$ = new Subject();
    // @ts-ignore
    component.resetForm$ = reset$;
    component.ngOnChanges({ resetForm$: new SimpleChange(null, reset$, false) });

    const initialFormValue = form.getRawValue();

    fillForm(form);
    reset$.next();

    const newValue = form.getRawValue();

    // dirty hack to fix `file` field comparing
    // after calling setValue it becomes `undefined`, while
    // it was `null` on form initialization
    newValue.file = newValue.file || null;

    expect(newValue).toEqual(initialFormValue);
  });

  it('form validation', () => {
    expect(form.invalid).toBe(true);

    fillForm(form);
    expect(form.invalid).toBe(false);
  });

  it('emit handled form value on submit', () => {
    const value = new ImportDeviceFormData(defaultFormValues);
    fillForm(form);

    component.submitForm.subscribe(v => expect(v).toEqual(value));

    component.submitImportForm();
  });

  it('should be disabled on loading', () => {
    // @ts-ignore
    component.loading = true;
    component.ngOnChanges({ loading: new SimpleChange(null, true, false)});

    expect(form.disabled).toBe(true);

    // @ts-ignore
    component.loading = false;
    component.ngOnChanges({ loading: new SimpleChange(null, false, false)});

    expect(form.disabled).toBe(false);
  });

  it('submit button should be disabled if form is invalid', () => {
    const submitButton: any = nativeElement.querySelector('#import-form-submit-button');
    expect(submitButton.disabled).toBe(true);

    fillForm(form);

    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy();
  });

  it('show file size limit warning', () => {
    const mockFile = { name: 'test.csv', size: limitWithHeader + 1 };
    const fileControl = form.get('file');
    const warningElementSelector = '#import-form-file-size-limit-warning';

    expect(nativeElement.querySelector(warningElementSelector)).toBeNull();

    fileControl.setValue(mockFile);
    fileControl.markAsTouched();
    fileControl.markAsDirty();

    fixture.detectChanges();
    const warningElement = nativeElement.querySelector('#import-form-file-size-limit-warning');

    expect(warningElement).toBeTruthy();
    expect(warningElement.innerHTML.trim()).toBe('Maximum file size is 9kb');
  });
});

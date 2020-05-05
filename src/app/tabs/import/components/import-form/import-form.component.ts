import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  Subscription,
} from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { ValidatorsService } from 'src/app/validators/validators.service';

enum EImportDeviceBatchType {
  SIM_IMPORT = 'sim_import',
};

const INITIAL_FORM_VALUE = {
  file: null,
  skip_header: false,
  batch_type: EImportDeviceBatchType.SIM_IMPORT,
  batch_provider: '',
  batch_description: '',
  batch_tags: '',
}

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.scss'],
})
export class ImportFormComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * observable to reset form from parent component
   */
  @Input('resetForm') resetForm$: Observable<void>;
 
  @Input() public readonly loading: boolean;

  /**
   * maximum rows per file
   */
  @Input() public readonly rowsCountLimit: number = 0;

  /**
   * row size in bytes
   */
  @Input() public readonly rowSize: number = 0;

  /**
   * header row size in bytes
   */
  @Input() public readonly headerRowSize: number = 0;

  /**
   * submit event
   */
  @Output() public submitForm: EventEmitter<ImportDeviceFormData> = new EventEmitter();

  /**
   * maximum rows per file subject
   */
  private rowsCountLimit$: BehaviorSubject<number> = new BehaviorSubject(this.rowsCountLimit);

  /**
   * row size in bytes subject
   */
  private rowSize$: BehaviorSubject<number> = new BehaviorSubject(this.rowSize);

  /**
   * header row size in bytes subject
   */
  private headerRowSize$: BehaviorSubject<number> = new BehaviorSubject(this.headerRowSize);

  /**
   * defines should the header row size be
   * included into file size calculation or no
   */
  private skipHeader$: BehaviorSubject<boolean> = new BehaviorSubject(INITIAL_FORM_VALUE.skip_header);

  /**
   * computed maximum file size
   */
  public fileSizeBytes$: Observable<number> = combineLatest(
    this.rowsCountLimit$,
    this.rowSize$,
    this.headerRowSize$,
    this.skipHeader$,
  ).pipe(
    map(([rowsCount, rowSize, headerRowSize, skipHeader]: [number, number, number, boolean]) => {
      // add rowsCount as rows are separated by `\n`
      const size = rowsCount * rowSize + rowsCount;

      // if header row would not be ignored, header row size also should be added to the limit
      if (!skipHeader) {
        // 1 is added as one more `\n` will be added with header row
        return size + headerRowSize + 1;
      }

      return size;
    }),
  );

  /**
   * file size in kylobytes to be shown in the form
   */
  public fileSizePrettified$: Observable<number> = this.fileSizeBytes$.pipe(
    map((bytes: number) => {
      return Math.floor(bytes / 1024);
    }),
  );

  /**
   * subscription to watch maximum file size and update
   * form validator
   */
  private updateFormFileSizeSubscription: Subscription;

  /**
   * update file size limit with (or without) header row size
   */
  private watchHeaderRowSizeSubscription: Subscription;

  /**
   * subscription for reset form observable
   */
  private resetFormSubscription: Subscription;

  public importForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validators: ValidatorsService,
  ) { }

  ngOnInit() {
    this.importForm = this.initImportForm();
    this.initHeaderRowCalculationSubscription();
    this.initFormUpdateValidatorsSubscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rowsCountLimit) {
      this.rowsCountLimit$.next(changes.rowsCountLimit.currentValue);
    }

    if (changes.rowSize) {
      this.rowSize$.next(changes.rowSize.currentValue);
    }

    if (changes.headerRowSize) {
      this.headerRowSize$.next(changes.headerRowSize.currentValue);
    }

    if (changes.resetForm$ && changes.resetForm$.currentValue) {
      this.setResetEventSubscription();
    }

    if (changes.loading) {
      if (changes.loading.currentValue) {
        this.importForm.disable();
      } else {
        this.importForm.enable();
      }
    }
  }

  ngOnDestroy() {
    if (this.updateFormFileSizeSubscription) {
      this.updateFormFileSizeSubscription.unsubscribe();
    }

    if (this.watchHeaderRowSizeSubscription) {
      this.watchHeaderRowSizeSubscription.unsubscribe();
    }

    if (this.resetFormSubscription) {
      this.resetFormSubscription.unsubscribe();
    }
  }

  /**
   * initialize form
   */
  private initImportForm(): FormGroup {
    return this.fb.group({
      file: [INITIAL_FORM_VALUE.file],
      skip_header: [INITIAL_FORM_VALUE.skip_header, Validators.required],
      batch_type: [INITIAL_FORM_VALUE.batch_type, Validators.required],
      batch_provider: [INITIAL_FORM_VALUE.batch_provider, Validators.required],
      batch_description: [INITIAL_FORM_VALUE.batch_description, Validators.required],
      batch_tags: [INITIAL_FORM_VALUE.batch_tags, Validators.required],
    });
  }

  /**
   * reset form and set initial values
   */
  private resetImportForm() {
    this.importForm.reset();
    this.importForm.setValue(INITIAL_FORM_VALUE);
  }

  /**
   * prepare value to submit and emit submit event
   */
  public submitImportForm() {
    if (this.importForm.invalid) {
      return;
    }

    const formValue = new ImportDeviceFormData(this.importForm.getRawValue());

    this.submitForm.emit(formValue);
  }

  /**
   * init subscription to watch file size limit changes
   * and update form validators
   */
  private initFormUpdateValidatorsSubscription() {
    this.updateFormFileSizeSubscription = this.fileSizeBytes$
      .pipe(distinctUntilChanged())
      .subscribe((size: number) => {
        const control = this.importForm.get('file');
        control.clearValidators();
        control.setValidators(
          [
            Validators.required,
            ValidatorsService.fileSizeValidator(null, size),
          ],
        );
        control.updateValueAndValidity();
      });
  }

  /**
   * watch 'skip_header' to update maximum file size
   * limit
   */
  private initHeaderRowCalculationSubscription() {
    this.watchHeaderRowSizeSubscription = this.importForm.get('skip_header').valueChanges.subscribe(
      (value: boolean) => {
        this.skipHeader$.next(value);
      },
    );
  }

  /**
   * subscribe to reset form event
   * if another observable has been passed earlier, remove
   * it's subscription
   */
  private setResetEventSubscription() {
    if (this.resetFormSubscription) {
      this.resetFormSubscription.unsubscribe();
    }

    this.resetFormSubscription = this.resetForm$.subscribe(
      () => {
        this.resetImportForm();
      },
    );
  }
}

export class ImportDeviceFormData {
  public file: File;
  public skip_header: boolean;
  public batch_type: EImportDeviceBatchType;
  public batch_provider: string;
  public batch_description: string;
  public batch_tags: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}

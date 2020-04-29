import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/validators/validators.service';

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.scss'],
})
export class ImportFormComponent implements OnInit {
  @Input() public readonly loading: boolean;
  @Input() private readonly fileSizeLimit: number;
  @Output() private submitForm: EventEmitter<ImportDeviceFormData> = new EventEmitter();
  public importForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validators: ValidatorsService,
  ) { }

  ngOnInit() {
    this.importForm = this.initImportForm();
  }

  /**
   * initialize form
   */
  private initImportForm(): FormGroup {
    return this.fb.group({
      file: [null, [Validators.required, ValidatorsService.fileSizeValidator(null, this.fileSizeLimit)]],
      skip_header: [false, Validators.required],
      batch_type: [EImportDeviceBatchType.SIM_IMPORT, Validators.required],
      batch_provider: ['', Validators.required],
      batch_description: ['', Validators.required],
      batch_tags: ['', Validators.required],
    });
  }

  /**
   * prepare value to submit
   */
  public submitImportForm() {
    if (this.importForm.invalid) {
      return;
    }

    const formValue = new ImportDeviceFormData(this.importForm.getRawValue());

    this.submitForm.emit(formValue);
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

enum EImportDeviceBatchType {
  SIM_IMPORT = 'sim_import',
};

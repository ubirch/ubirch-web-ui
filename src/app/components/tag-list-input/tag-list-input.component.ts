import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';

@Component({
  selector: 'ubirch-tag-list-input',
  templateUrl: './tag-list-input.component.html',
  styleUrls: ['./tag-list-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagListInputComponent),
      multi: true
    }
  ]
})
export class TagListInputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder = 'You can add tags here';
  public disabled = false;
  public tagsList: string[] = [];
  public tagFormGroup: FormGroup;
  private propagateChange = (_: any) => {};
  private propagateTouch = (_: any) => {};

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.tagFormGroup = this.fb.group({
      item: ['']
    });
    this.tagFormGroup.setValue({item: ''});
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(tags: string[]): void {
    this.tagsList = tags;
  }
  public removeTag(tag: string): void {
    if (this.tagsList && this.tagsList.length > 0) {
      const index = this.tagsList.indexOf(tag);
      if (index >= 0) {
        this.tagsList.splice(index, 1);
        this.tagListChanged();
      }
    }
  }
  public addTag(event: any): void {
    const tag = event.target.value;
    if (!this.tagsList.includes(tag)) {
      this.tagsList.push(tag);
      this.tagFormGroup.setValue({item: ''});
      this.tagListChanged();
    }

  }

  private tagListChanged() {
    this.propagateChange(this.tagsList);
  }

}

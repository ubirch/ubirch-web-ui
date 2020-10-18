import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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

  public disabled = false;
  public tagsList: string[] = [];
  private propagateChange = (_: any) => {};
  private propagateTouch = (_: any) => {};

  constructor() { }

  ngOnInit() {}

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

}

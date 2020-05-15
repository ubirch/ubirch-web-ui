import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputComponent } from './file-input.component';

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  const mockFile = { name: 'file.csv', size: 10000 } as File;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileInputComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set value with writeValue for single-file mode', () => {
    component.writeValue(mockFile);

    expect(component.value).toEqual([mockFile]);
  });

  it('set value with writeValue for multiple-file mode', () => {
    const files = [mockFile, { ...mockFile }];
    // @ts-ignore
    component.multiple = true;
    component.writeValue(files);

    expect(component.value).toEqual(files);
  });

  it('set value on inputChange', () => {
    const files = [mockFile];
    const mockEvent = { target: { files } };

    // @ts-ignore
    component.inputChange(mockEvent);

    expect(component.value).toEqual(files);
  });

  it('trigger click on input file on openFileSelect', () => {
    const inputClickSpy = spyOn(component.fileInput.nativeElement, 'click');
    component.openFileSelect();
    expect(inputClickSpy).toHaveBeenCalled();
  });

  it('set onTouch', () => {
    const fn = () => {};
    component.registerOnTouched(fn);
    expect(component.onTouch).toBe(fn);
  });

  it('set propagateChange', () => {
    const fn = () => {};
    component.registerOnChange(fn);
    expect(component.propagateChange).toBe(fn);
  });

  it('emit single file for single-file mode', () => {
    const fn = () => {};
    component.registerOnChange(fn);

    const onChangeSpy = spyOn(component, 'propagateChange');
    component.value = [mockFile];

    expect(onChangeSpy).toHaveBeenCalledWith(mockFile);
  });

  it('emit single file for multiple-file mode', () => {
    const fn = () => {};
    component.registerOnChange(fn);
    // @ts-ignore
    component.multiple = true;

    const onChangeSpy = spyOn(component, 'propagateChange');
    component.value = [mockFile];

    expect(onChangeSpy).toHaveBeenCalledWith([mockFile]);
  });
});

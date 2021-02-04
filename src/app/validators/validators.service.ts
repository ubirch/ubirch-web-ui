import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  /**
   * validate file control
   * @param min minimum file size in bytes
   * @param max maximum file size in bytes
   */
  public static fileSizeValidator(min: number = 0, max: number = 0) {
    if (max < min) {
      throw new Error('Maximum file size cannot be smaller than minimum');
    }

    return (c: FormControl) => {
      const file: File | null = c.value;

      if (!file) {
        return null;
      }

      if (file.size < min) {
        return { fileMinSize: true };
      }

      if (file.size > max) {
        return { fileMaxSize: true };
      }

      return null;
    };
  }
}

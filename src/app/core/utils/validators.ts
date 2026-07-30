import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static indianMobile(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^[6-9][0-9]{9}$/.test(control.value.trim());
      return valid ? null : { invalidIndianMobile: true };
    };
  }

  static gstNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(control.value.trim());
      return valid ? null : { invalidGstNumber: true };
    };
  }

  static pinCode(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^[1-9][0-9]{5}$/.test(control.value.trim());
      return valid ? null : { invalidPinCode: true };
    };
  }

  static futureOrTodayDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate >= today ? null : { pastDate: true };
    };
  }
}

/** token is valid for all devices OR at least one device has to be set */
import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const targetIdentitiesValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const validForAll: boolean = control.get('validForAll').value;
  const targetIdentities: string[] = control.get('targetIdentities').value;
  // const targetGroups: string[] = control.get('targetGroups').value;
  return validForAll || targetIdentities?.length > 0 ? null : { targetItentitiesNotSelected: true };
};

/** token is valid for all devices OR at least one device has to be set */
import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const targetIdentitiesValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const validForAll: boolean = control.get('validForAll').value;
  if (validForAll) {
    const expiration: string = control.get('expiration').value;
    return expiration?.length > 0 ? null : { expirationDateForWildcardTokenNotSet: true };
  } else {
    const targetIdentities: string[] = control.get('targetIdentities').value;
    const targetGroups: string[] = control.get('targetGroups').value;
    return targetIdentities?.length > 0 || targetGroups?.length > 0 ? null :
      { targetItentitiesOrGroupNotSelected: true, activateWildcardToken: true};
  }
};

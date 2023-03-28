/** token is valid for all devices OR at least one device has to be set */
import {UntypedFormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const targetIdentitiesValidator: ValidatorFn = (control: UntypedFormGroup): ValidationErrors | null => {
  const validForAll: boolean = control.get('validForAll').value;
  const expiration: string = control.get('expiration').value;
  const notBefore: string = control.get('notBefore').value;
  if (expiration?.length > 0 && notBefore?.length > 0 && new Date(expiration) < new Date(notBefore)) {
    return { expirationDateBeforeValidFrom: true };
  }
  if (validForAll) {
    return expiration?.length > 0 ? null : { expirationDateForWildcardTokenNotSet: true };
  } else {
    const targetIdentities: string[] = control.get('targetIdentities').value;
    const targetGroups: string[] = control.get('targetGroups').value;
    return targetIdentities?.length > 0 || targetGroups?.length > 0 ? null :
      { targetItentitiesOrGroupNotSelected: true, activateWildcardToken: true};
  }
};

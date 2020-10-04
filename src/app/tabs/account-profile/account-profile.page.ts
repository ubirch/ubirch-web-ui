import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastType} from '../../enums/toast-type.enum';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.page.html',
  styleUrls: ['./account-profile.page.scss'],
})
export class AccountProfilePage implements OnInit {

  actionButtons = [];

  public accountProfileForm: FormGroup;
  public profileHasUnsavedChanges = false;

  constructor(
    private fb: FormBuilder,
    public toast: ToastService,
  ) { }

  ngOnInit() {
    this.accountProfileForm = this.fb.group({
    });
  }

  handleButtonClick(action: string) {
    switch (action) {
      default:
        console.log('No method implemented yet!');
    }
  }

  public discardChanges() {
    this.toast.openToast(ToastType.light, 'toast.account.profile.update.canceled', 4000);
    this.accountProfileForm.patchValue({});
  }

  public saveProfile() {
    console.warn('Saving Profile is not yet implemented!');
  }

}

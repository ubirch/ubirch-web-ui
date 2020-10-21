import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastType} from '../../enums/toast-type.enum';
import {ToastService} from '../../services/toast.service';

export const zipPattern: Validators = Validators.pattern(/^[\d]{4,5}$/);
export const phonePattern: Validators = Validators.pattern(/^[\d()\-\_#\ \+\/]{0,}$/);
export const emailPattern: Validators = Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);
export const maxLength40Pattern: Validators = Validators.maxLength(40);
export const isNumberPattern: Validators = Validators.pattern('^[0-9]*$');
import {ACCOUNT_DATA} from '../../../../testdata/account-data';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-account-profile',
    templateUrl: './account-profile.page.html',
    styleUrls: ['./account-profile.page.scss'],
})
export class AccountProfilePage implements OnInit {

    actionButtons = [];

    public tenantProfileForm: FormGroup;
    public mainContact: FormGroup;
    public profileData: object;

    get mainSalut() {
        return this.tenantProfileForm.get(['mainContact', 'mainSalut']);
    }

    get mainTitle() {
        return this.tenantProfileForm.get(['mainContact', 'mainTitle']);
    }

    get mainGName() {
        return this.tenantProfileForm.get(['mainContact', 'mainGName']);
    }

    get mainSName() {
        return this.tenantProfileForm.get(['mainContact', 'mainSName']);
    }

    get mainEmail() {
        return this.tenantProfileForm.get(['mainContact', 'mainEmail']);
    }

    get mainPhone() {
        return this.tenantProfileForm.get(['mainContact', 'mainPhone']);
    }

    get mainMobile() {
        return this.tenantProfileForm.get(['mainContact', 'mainMobile']);
    }

    get mainPos() {
        return this.tenantProfileForm.get(['mainContact', 'mainPos']);
    }

    get comName() {
        return this.tenantProfileForm.get(['company', 'comName']);
    }

    get comStreet() {
        return this.tenantProfileForm.get(['company', 'billingAddress', 'comStreet']);
    }

    get comNum() {
        return this.tenantProfileForm.get(['company', 'billingAddress', 'comNum']);
    }

    get comZip() {
        return this.tenantProfileForm.get(['company', 'billingAddress', 'comZip']);
    }

    get comCity() {
        return this.tenantProfileForm.get(['company', 'billingAddress', 'comCity']);
    }

    get comCountry() {
        return this.tenantProfileForm.get(['company', 'billingAddress', 'comCountry']);
    }

    get comVat() {
        return this.tenantProfileForm.get(['company', 'comVat']);
    }

    get comTax() {
        return this.tenantProfileForm.get(['company', 'comTax']);
    }

    get techSalut() {
        return this.tenantProfileForm.get(['technicalContact', 'techSalut']);
    }

    get techTitle() {
        return this.tenantProfileForm.get(['technicalContact', 'techTitle']);
    }

    get techGName() {
        return this.tenantProfileForm.get(['technicalContact', 'techGName']);
    }

    get techSName() {
        return this.tenantProfileForm.get(['technicalContact', 'techSName']);
    }

    get techEmail() {
        return this.tenantProfileForm.get(['technicalContact', 'techEmail']);
    }

    get techPhone() {
        return this.tenantProfileForm.get(['technicalContact', 'techPhone']);
    }

    get techMobile() {
        return this.tenantProfileForm.get(['technicalContact', 'techMobile']);
    }

    get techPos() {
        return this.tenantProfileForm.get(['technicalContact', 'techPos']);
    }

    get finSalut() {
        return this.tenantProfileForm.get(['financialContact', 'finSalut']);
    }

    get finTitle() {
        return this.tenantProfileForm.get(['financialContact', 'finTitle']);
    }

    get finGName() {
        return this.tenantProfileForm.get(['financialContact', 'finGName']);
    }

    get finSName() {
        return this.tenantProfileForm.get(['financialContact', 'finSName']);
    }

    get finEmail() {
        return this.tenantProfileForm.get(['financialContact', 'finEmail']);
    }

    get finPhone() {
        return this.tenantProfileForm.get(['financialContact', 'finPhone']);
    }

    get finMobile() {
        return this.tenantProfileForm.get(['financialContact', 'finMobile']);
    }

    get finPos() {
        return this.tenantProfileForm.get(['financialContact', 'finPos']);
    }


    constructor(
        private fb: FormBuilder,
        public toast: ToastService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.tenantProfileForm = this.fb.group({
            mainContact: this.fb.group({
                mainSalut: [null, [Validators.required]],
                mainTitle: [null],
                mainGName: [null, [Validators.required]],
                mainSName: [null, [Validators.required]],
                mainEmail: [null, [Validators.required, emailPattern]],
                mainPhone: [null, [Validators.required, phonePattern]],
                mainMobile: [null, [Validators.required, phonePattern]],
                mainPos: [null],
            }),
            company: this.fb.group({
                comName: [null, [Validators.required]],
                billingAddress: this.fb.group({
                    comStreet: [null, [Validators.required]],
                    comNum: [null, [Validators.required]],
                    comZip: [null, [zipPattern, Validators.required]],
                    comCity: [null, [Validators.required]],
                    comCountry: [null, [Validators.required]],
                }),
                comVat: [null],
                comTax: [null],
            }),
            technicalContact: this.fb.group({
                techSalut: [null],
                techTitle: [null],
                techGName: [null],
                techSName: [null],
                techEmail: [null, emailPattern],
                techPhone: [null, phonePattern],
                techMobile: [null, phonePattern],
                techPos: [null],
            }),
            financialContact: this.fb.group({
                finSalut: [null],
                finTitle: [null],
                finGName: [null],
                finSName: [null],
                finEmail: [null, emailPattern],
                finPhone: [null, phonePattern],
                finMobile: [null, phonePattern],
                finPos: [null]
            })
        });
        this.profileData = ACCOUNT_DATA;
        this.fillData(this.profileData);
        console.log(this.tenantProfileForm.value);
    }

    handleButtonClick(action: string) {
        switch (action) {
            default:
                console.log('No method implemented yet!');
        }
    }

    createJson(formData) {
        console.log(JSON.stringify(this.profileData));

    }

    public discardChanges() {
        this.toast.openToast(ToastType.light, 'toast.account.profile.update.canceled', 4000);
        console.log(this.profileData);
        this.fillData(this.profileData);
    }

    public saveProfile() {
        this.profileData = this.tenantProfileForm.value;
        console.log(this.profileData);
        this.userService.updateProfileData();
    }

    fillData(profileData) {
        console.log(profileData.company.billi)
        this.mainSalut.setValue(profileData.mainContact.mainSalut);
        this.mainTitle.setValue(profileData.mainContact.mainTitle);
        this.mainGName.setValue(profileData.mainContact.mainGName);
        this.mainSName.setValue(profileData.mainContact.mainSName);
        this.mainEmail.setValue(profileData.mainContact.mainEmail);
        this.mainPhone.setValue(profileData.mainContact.mainPhone);
        this.mainMobile.setValue(profileData.mainContact.mainMobile);
        this.mainPos.setValue(profileData.mainContact.mainPos);
        this.comName.setValue(profileData.company.comName);
        this.comStreet.setValue(profileData.company.billingAddress.comStreet);
        this.comNum.setValue(profileData.company.billingAddress.comNum);
        this.comZip.setValue(profileData.company.billingAddress.comZip);
        this.comCity.setValue(profileData.company.billingAddress.comCity);
        this.comCountry.setValue(profileData.company.billingAddress.comCountry);
        this.comVat.setValue(profileData.company.comVat);
        this.comTax.setValue(profileData.company.comTax);
        this.techSalut.setValue(profileData.technicalContact.techSalut);
        this.techTitle.setValue(profileData.technicalContact.techTitle);
        this.techGName.setValue(profileData.technicalContact.techGName);
        this.techSName.setValue(profileData.technicalContact.techSName);
        this.techEmail.setValue(profileData.technicalContact.techEmail);
        this.techPhone.setValue(profileData.technicalContact.techPhone);
        this.techMobile.setValue(profileData.technicalContact.techMobile);
        this.techPos.setValue(profileData.technicalContact.techPos);
        this.finSalut.setValue(profileData.financialContact.finSalut);
        this.finTitle.setValue(profileData.financialContact.finTitle);
        this.finGName.setValue(profileData.financialContact.finGName);
        this.finSName.setValue(profileData.financialContact.finSName);
        this.finEmail.setValue(profileData.financialContact.finEmail);
        this.finPhone.setValue(profileData.financialContact.finPhone);
        this.finMobile.setValue(profileData.financialContact.finMobile);
        this.finPos.setValue(profileData.financialContact.finPos);
    }
}

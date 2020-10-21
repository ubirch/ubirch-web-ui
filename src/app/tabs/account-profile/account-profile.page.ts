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
        return this.tenantProfileForm.get(['company', 'billingAdress', 'comStreet']);
    }

    get comNum() {
        return this.tenantProfileForm.get(['company', 'billingAdress', 'comNum']);
    }

    get comZip() {
        return this.tenantProfileForm.get(['company', 'billingAdress', 'comZip']);
    }

    get comCity() {
        return this.tenantProfileForm.get(['company', 'billingAdress', 'comCity']);
    }

    get comCountry() {
        return this.tenantProfileForm.get(['company', 'billingAdress', 'comCountry']);
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
                billingAdress: this.fb.group({
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
        this.tenantProfileForm.patchValue({});
    }

    public saveProfile() {
        this.userService.updateProfileData();
    }

    fillData(profileData) {
        this.mainSalut.setValue(profileData.mainContact.salutation);
        this.mainTitle.setValue(profileData.mainContact.title);
        this.mainGName.setValue(profileData.mainContact.givenname);
        this.mainSName.setValue(profileData.mainContact.Surname);
        this.mainEmail.setValue(profileData.mainContact.email);
        this.mainPhone.setValue(profileData.mainContact.phone);
        this.mainMobile.setValue(profileData.mainContact.mobile);
        this.mainPos.setValue(profileData.mainContact.position);
        this.comName.setValue(profileData.company.companyname);
        this.comStreet.setValue(profileData.company.billingAddress.street);
        this.comNum.setValue(profileData.company.billingAddress.number);
        this.comZip.setValue(profileData.company.billingAddress.zipcode);
        this.comCity.setValue(profileData.company.billingAddress.city);
        this.comCountry.setValue(profileData.company.billingAddress.country);
        this.comVat.setValue(profileData.company.vatid);
        this.comTax.setValue(profileData.company.taxid);
        this.techSalut.setValue(profileData.technicalContact.salutation);
        this.techTitle.setValue(profileData.technicalContact.title);
        this.techGName.setValue(profileData.technicalContact.givenname);
        this.techSName.setValue(profileData.technicalContact.Surname);
        this.techEmail.setValue(profileData.technicalContact.email);
        this.techPhone.setValue(profileData.technicalContact.phone);
        this.techMobile.setValue(profileData.technicalContact.mobile);
        this.techPos.setValue(profileData.technicalContact.position);
        this.finSalut.setValue(profileData.financialContact.salutation);
        this.finTitle.setValue(profileData.financialContact.title);
        this.finGName.setValue(profileData.financialContact.givenname);
        this.finSName.setValue(profileData.financialContact.Surname);
        this.finEmail.setValue(profileData.financialContact.email);
        this.finPhone.setValue(profileData.financialContact.phone);
        this.finMobile.setValue(profileData.financialContact.mobile);
        this.finPos.setValue(profileData.financialContact.position);
    }
}

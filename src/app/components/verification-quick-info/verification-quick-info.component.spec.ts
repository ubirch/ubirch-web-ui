import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VerificationQuickInfoComponent} from './verification-quick-info.component';

describe('VerificationQuickInfoComponent', () => {
    let component: VerificationQuickInfoComponent;
    let fixture: ComponentFixture<VerificationQuickInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VerificationQuickInfoComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VerificationQuickInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

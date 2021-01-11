import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TokenQrCodePopupComponent } from './token-qr-code-popup.component';

describe('TokenQrCodePopupComponent', () => {
  let component: TokenQrCodePopupComponent;
  let fixture: ComponentFixture<TokenQrCodePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenQrCodePopupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TokenQrCodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TokenManagerPage } from './token-manager.page';

describe('TokenManagerPage', () => {
  let component: TokenManagerPage;
  let fixture: ComponentFixture<TokenManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TokenManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

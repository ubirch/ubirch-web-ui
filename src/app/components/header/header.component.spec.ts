import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';
import { timer } from 'rxjs';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let injector: TestBed;
  let keycloackService: MockKeycloakService;
  let nativeElement: HTMLElement;

  class MockKeycloakService {
    resolveLoggedIn: (value: boolean) => void;

    isLoggedIn() {
      return new Promise(res => {
        this.resolveLoggedIn = res;
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: KeycloakService,
          useClass: MockKeycloakService
        }
      ]
    })
    .compileComponents();

    injector = getTestBed();
    keycloackService = injector.get(KeycloakService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isLoggedIn should be true if user is authorized', async () => {
    keycloackService.resolveLoggedIn(true);
    await timer(0).toPromise();

    expect(component.isLoggedIn).toBe(true);
  });

  it('isLoggedIn should be false if user is not authorized', async () => {
    keycloackService.resolveLoggedIn(false);
    await timer(0).toPromise();

    expect(component.isLoggedIn).toBe(false);
  });

  it('show user data row should be if user is authorized', async () => {
    keycloackService.resolveLoggedIn(true);
    await timer(0).toPromise();

    fixture.detectChanges();
    expect(nativeElement.querySelector('#header-user-data-row')).toBeTruthy();
  });

  it('do not show user data row if user is not authorized', async () => {
    keycloackService.resolveLoggedIn(false);
    await timer(0).toPromise();

    fixture.detectChanges();
    expect(nativeElement.querySelector('#header-user-data-row')).toBeNull();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { LoggedInUserComponent } from './logged-in-user.component';
import {timer} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoggedInUserComponent', () => {
  let component: LoggedInUserComponent;
  let fixture: ComponentFixture<LoggedInUserComponent>;
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
      declarations: [ LoggedInUserComponent ],
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
    fixture = TestBed.createComponent(LoggedInUserComponent);
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

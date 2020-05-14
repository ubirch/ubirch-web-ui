import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { Subject, timer } from 'rxjs';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
  let fixture: ComponentFixture<AppComponent>;
  let keycloackService: MockKeycloakService;
  let userService: MockUserService;
  let injector: TestBed;
  let nativeElement: HTMLElement;

  class MockKeycloakService {
    resolveLoggedIn: (value: boolean) => void;

    isLoggedIn() {
      return new Promise(res => {
        this.resolveLoggedIn = res;
      });
    }
  }

  class MockUserService {
    observableAccountInfo = new Subject();
  }

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: KeycloakService, useClass: MockKeycloakService },
        { provide: UserService, useClass: MockUserService }
      ],
      imports: [ RouterTestingModule.withRoutes([]), HttpClientTestingModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;

    injector = getTestBed();
    keycloackService = injector.get(KeycloakService);
    userService = injector.get(UserService);
  }));

  it('should create the app', async () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  it('should have menu labels', async () => {
    keycloackService.resolveLoggedIn(true);
    userService.observableAccountInfo.next({});

    await timer(0).toPromise();
    fixture.detectChanges();

    const menuItems = nativeElement.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(5); // the 5th is copyright

    expect(menuItems[0].textContent).toContain('Home');
    expect(menuItems[1].textContent).toContain('Things');
    expect(menuItems[2].textContent).toContain('Verification');
    expect(menuItems[3].textContent).toContain('Logout');
  });

  it('should have urls', async () => {
    keycloackService.resolveLoggedIn(true);
    userService.observableAccountInfo.next({});

    await timer(0).toPromise();
    fixture.detectChanges();

    const menuItems = nativeElement.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(5); // the 5th is copyright
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/home');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/devices');
    expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual('/verification');
    expect(menuItems[3].getAttribute('ng-reflect-router-link')).toEqual('/logout');
  });

  it('should show import link if user is admin', async () => {
    keycloackService.resolveLoggedIn(true);
    userService.observableAccountInfo.next({ isAdmin: true });

    await timer(0).toPromise();
    fixture.detectChanges();

    const menuItems = nativeElement.querySelectorAll('ion-item');
    
    expect(menuItems.length).toEqual(6); // the 6th is copyright

    expect(menuItems[3].textContent).toContain('Import');
    expect(menuItems[3].getAttribute('ng-reflect-router-link')).toEqual('/import');
  });

  it('should show only verification link if user is admin', async () => {
    keycloackService.resolveLoggedIn(false);
    userService.observableAccountInfo.next(null);

    await timer(0).toPromise();
    fixture.detectChanges();

    const menuItems = nativeElement.querySelectorAll('ion-item');
  
    expect(menuItems.length).toEqual(2); // the 2md is copyright

    expect(menuItems[0].textContent).toContain('Verification');
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/verification');
  });
});

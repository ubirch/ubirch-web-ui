import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { VerificationPage } from './verification.page';
import { TrustService } from 'src/app/services/trust.service';
import { CytoscapeGraphService } from 'src/app/services/cytoscape-graph.service';

describe('VerificationPage', () => {
  let component: VerificationPage;
  let fixture: ComponentFixture<VerificationPage>;

  const hash = 'TEST_HASH';

  let route: { queryParams: Subject<any> };
  let injector: TestBed;
  let truster: TrustService;
  let cytoService: CytoscapeGraphService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: new Subject(),
          }
        },
        {
          provide: TrustService,
          useValue: {
            saveHash() {},
            verifyByHash(hash) {
              return of(true);
            },
            observableHash: of(null),
            observableVerifiedHash: of(null),
            observableVerificationState: of(null),
          }
        },
        {
          provide: CytoscapeGraphService,
          useValue: {
            resetAll() {}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    injector = getTestBed();
    route = injector.get(ActivatedRoute);
    truster = injector.get(TrustService);
    cytoService = injector.get(CytoscapeGraphService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('do not verify hash if no hash query parameter provided', () => {
    const saveHashSpy = spyOn(truster, 'saveHash').and.callThrough();
    const resetAllSpy = spyOn(cytoService, 'resetAll').and.callThrough();
    const verifyByHashSpy = spyOn(truster, 'verifyByHash').and.callThrough();

    route.queryParams.next({});

    expect(saveHashSpy).toHaveBeenCalledTimes(0);
    expect(resetAllSpy).toHaveBeenCalledTimes(0);
    expect(verifyByHashSpy).toHaveBeenCalledTimes(0);
  });

  it('verify hash if hash query parameter provided', () => {
    const saveHashSpy = spyOn(truster, 'saveHash').and.callThrough();
    const resetAllSpy = spyOn(cytoService, 'resetAll').and.callThrough();
    const verifyByHashSpy = spyOn(truster, 'verifyByHash').and.callThrough();

    route.queryParams.next({ hash });

    expect(saveHashSpy).toHaveBeenCalledWith(hash);
    expect(resetAllSpy).toHaveBeenCalled();
    expect(verifyByHashSpy).toHaveBeenCalledWith(hash);
  });
});

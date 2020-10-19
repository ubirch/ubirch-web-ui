import { TestBed } from '@angular/core/testing';

import { CytoscapeGraphService } from './cytoscape-graph.service';

describe('CytoscapeGraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CytoscapeGraphService = TestBed.inject(CytoscapeGraphService);
    expect(service).toBeTruthy();
  });
});

import { CytoscapeEdge } from './cytoscape-edge';

describe('CytoscapeEdge', () => {
  it('should create an instance', () => {
    expect(new CytoscapeEdge('source', 'target')).toBeTruthy();
  });
});

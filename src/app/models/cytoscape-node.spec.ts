import { CytoscapeNode } from './cytoscape-node';
import {AnchorPathNode} from './anchor-path-node';

describe('CytoscapeNode', () => {
  it('should create an instance', () => {
    expect(new CytoscapeNode(new AnchorPathNode(''))).toBeTruthy();
  });
});

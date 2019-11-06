import {CytoscapeNodeLayout} from './cytoscape-node-layout';
import {AnchorPathNode} from './anchor-path-node';

export class CytoscapeNode {
  public data: CytoscapeNodeData;

  constructor(anchorPathNode: AnchorPathNode, layouter?: Map<string, CytoscapeNodeLayout>) {
    if (anchorPathNode) {
      this.data = new CytoscapeNodeData(anchorPathNode, layouter);
    }
    return this;
  }
}

export class CytoscapeNodeData {
  public id: string;
  public name: string;
  public weight: number;
  public colorCode: string;
  public shapeType: string;

  constructor(anchorPathNode: AnchorPathNode, layouter?: Map<string, CytoscapeNodeLayout>) {
    if (anchorPathNode) {
      this.name = anchorPathNode.label;
      this.id = anchorPathNode.hash;
      this.weight = 100;

      const layout = this.getNodeLayout(anchorPathNode.type, layouter);
      this.colorCode = layout.colorCode;
      this.shapeType = layout.shapeType;
    }
    return this;
  }

  private getNodeLayout(type: string, layouter: Map<string, CytoscapeNodeLayout>): CytoscapeNodeLayout {
    let layout = new CytoscapeNodeLayout();
    if (layouter && layouter.get(type)) {
      layout = layouter.get(type);
    }
    return layout;
  }
}

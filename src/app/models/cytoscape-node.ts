import {CytoscapeNodeLayout} from './cytoscape-node-layout';
import {AnchorPathNode} from './anchor-path-node';
import {BlockChainNode} from './block-chain-node';

export class CytoscapeNode {
  public data: CytoscapeNodeData;
  public classes: string;
  public parent: string;  /** reference to parent node */

  constructor(anchorPathNode: AnchorPathNode, layouter?: Map<string, CytoscapeNodeLayout>) {
    if (anchorPathNode) {
      this.data = new CytoscapeNodeData(anchorPathNode, layouter);
      this.classes = this.addNodeClasses(this.data);
      this.parent = this.addParent(this.data);
    }
    return this;
  }

  private addNodeClasses(data: CytoscapeNodeData): string {
    if (data && data.type) {
      return data.type;
    }
    return undefined;
  }

  private addParent(data: CytoscapeNodeData): string {
    if (data && data.parent) {
      return data.parent;
    }
    return undefined;
  }
}

/**
 * Format:
 *     { data: { id: 'a', name: 'Signup', weight: 100, colorCode: 'blue', shapeType: 'roundrectangle' } }
 */
export class CytoscapeNodeData {
  public id: string;
  public parent: string;
  public label: string;
  public weight: number;
  public nodeIcon: string;
  public colorCode: string;
  public shapeType: string;
  public type: string;
  public subType: string;
  public timestamp: string;
  public positionInChain: number;

  constructor(anchorPathNode: AnchorPathNode, layouter?: Map<string, CytoscapeNodeLayout>) {
    if (anchorPathNode) {
      this.type = anchorPathNode.type;

      if (this.type === 'UPP') {
        this.label = anchorPathNode.label; // + ' (' + anchorPathNode.timestamp + ')';
      } else if (anchorPathNode instanceof BlockChainNode) {
        this.subType = anchorPathNode.blockchain;
        this.label = anchorPathNode.blockchain;
      } else {
        this.label = '';
      }

      this.id = anchorPathNode.hash;
      this.parent = anchorPathNode.parent;
      this.timestamp = anchorPathNode.timestamp;
      this.weight = 100;
      this.positionInChain = anchorPathNode.indexInChain;
      const layout = this.getNodeLayout(this.subType ? this.subType : this.type, layouter);
      this.nodeIcon = layout.nodeIcon;
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

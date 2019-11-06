import {AnchorPathNode} from './anchor-path-node';
import {BlockChainNode} from './block-chain-node';
import {isArray} from 'util';
import {CytoscapeNode} from './cytoscape-node';
import {UbirchWebUIUtilsService} from '../utils/ubirch-web-uiutils.service';

export class Upp {
  public upp: string;
  public anchors: {
    upperPath: AnchorPathNode[],
    upperBlockChains: BlockChainNode[],
    lowerPath: AnchorPathNode[],
    lowerBlockChains: BlockChainNode[]
  };

  // tslint:disable-next-line:variable-name
  private _allNodesMap: Map<string, CytoscapeNode>;
  // tslint:disable-next-line:variable-name
  private _allNodes: CytoscapeNode[];

  constructor(jsonUpp: any) {
    if (jsonUpp) {
      this.upp = jsonUpp.upp;
      this.anchors = {
        upperPath: [],
        upperBlockChains: [],
        lowerPath: [],
        lowerBlockChains: []
      };
      if (jsonUpp.anchors) {
        const anchors = jsonUpp.anchors;
        this.readArrayOfAnchorNodes(anchors.upper_path, this.anchors.upperPath, 'AnchorPathNode');
        this.readArrayOfAnchorNodes(anchors.lower_path, this.anchors.lowerPath, 'AnchorPathNode');
        this.readArrayOfAnchorNodes(anchors.upper_blockchains, this.anchors.upperBlockChains, 'BlockChainNode');
        this.readArrayOfAnchorNodes(anchors.lower_blockchains, this.anchors.lowerBlockChains, 'BlockChainNode');
      }
    }
    return this;
  }

  public get allNodes(): CytoscapeNode[] {
    if (!this._allNodes) {
      this.createNodes();
    }
    return this._allNodes;
  }

  private createNodes() {
    if (!this.upp || !this.anchors) {
      this._allNodes = [];
      return;
    }

    this._allNodesMap = new Map<string, CytoscapeNode>();

    this.anchors.upperPath.map(node => this._allNodesMap.set(node.hash, new CytoscapeNode(node)));
    this.anchors.upperBlockChains.map(node => this._allNodesMap.set(node.hash, new CytoscapeNode(node)));
    this.anchors.lowerPath.map(node => this._allNodesMap.set(node.hash, new CytoscapeNode(node)));
    this.anchors.lowerBlockChains.map(node => this._allNodesMap.set(node.hash, new CytoscapeNode(node)));

    this._allNodes = UbirchWebUIUtilsService.mapToArray(this._allNodesMap);
  }

  private createVertices() {
    // TODO: create vertices
  }

  private readArrayOfAnchorNodes(data: any, target: any[], type: string) {
    if (data && isArray(data)) {
      switch (type) {
        case('AnchorPathNode'):
          data.forEach(path => target.push(new AnchorPathNode(path)));
          break;
        case('BlockChainNode'):
          data.forEach(path => target.push(new BlockChainNode(path)));
          break;
      }
    }
  }
}

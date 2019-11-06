import {AnchorPathNode} from './anchor-path-node';
import {BlockChainNode} from './block-chain-node';
import {isArray} from 'util';
import {CytoscapeNode} from './cytoscape-node';
import {UbirchWebUIUtilsService} from '../utils/ubirch-web-uiutils.service';
import {CytoscapeEdge} from './cytoscape-edge';

export class Upp {
  public upp: string;
  public anchors: {
    upperPath: AnchorPathNode[],
    upperBlockChains: BlockChainNode[],
    lowerPath: AnchorPathNode[],
    lowerBlockChains: BlockChainNode[]
  };

  // tslint:disable-next-line:variable-name
  private _allNodesMap: Map<string, AnchorPathNode>;
  // tslint:disable-next-line:variable-name
  private _allNodes: CytoscapeNode[];

  // tslint:disable-next-line:variable-name
  private _allEdges: CytoscapeEdge[];

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

  public get allEdges(): CytoscapeEdge[] {
    if (!this._allEdges) {
      this.createEdges();
    }
    return this._allEdges;
  }

  private createNodes() {
    if (!this.upp || !this.anchors) {
      this._allNodes = [];
      return;
    }

    this._allNodesMap = new Map<string, AnchorPathNode>();

    this.anchors.upperPath.map(node => this._allNodesMap.set(node.hash, node));
    this.anchors.upperBlockChains.map(node => this._allNodesMap.set(node.hash, node));
    this.anchors.lowerPath.map(node => this._allNodesMap.set(node.hash, node));
    this.anchors.lowerBlockChains.map(node => this._allNodesMap.set(node.hash, node));

    const nodesArray = UbirchWebUIUtilsService.mapToArray(this._allNodesMap);
    this._allNodes = nodesArray.map(node => new CytoscapeNode(node));
  }

  private createEdges() {
    if (this._allNodesMap) {
      this.allNodes.forEach(node => {
        if (node.data) {
          const fullNode = this._allNodesMap.get(node.data.id);
          if (fullNode) {
            this.createEdgeIfExists(fullNode.hash, fullNode.nextHash);
            this.createEdgeIfExists(fullNode.prevHash, fullNode.hash);
          }
          }
      });
    }
  }

  private createEdgeIfExists(source: string, target: string) {
    if (!this._allEdges) {
      this._allEdges = [];
    }

    if (source && target
      && this._allNodesMap.get(source)
      && this._allNodesMap.get(target)) {
      this._allEdges.push(new CytoscapeEdge(source, target));
    }
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

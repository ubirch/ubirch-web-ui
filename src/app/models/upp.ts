import {AnchorPathNode} from './anchor-path-node';
import {BlockChainNode} from './block-chain-node';
import {isArray} from 'util';
import {CytoscapeNode} from './cytoscape-node';
import {UbirchWebUIUtilsService} from '../utils/ubirch-web-uiutils.service';
import {CytoscapeEdge} from './cytoscape-edge';
import {CytoscapeNodeLayout} from './cytoscape-node-layout';

export class Upp {
  private jsonString: string;
  public upp: string;
  public anchors: {
    upperPath: AnchorPathNode[],
    upperBlockChains: BlockChainNode[],
    lowerPath: AnchorPathNode[],
    lowerBlockChains: BlockChainNode[]
  };
  private layouter: Map<string, CytoscapeNodeLayout>;

  // tslint:disable-next-line:variable-name
  private _allNodesMap: Map<string, AnchorPathNode>;
  // tslint:disable-next-line:variable-name
  private _allNodes: CytoscapeNode[];

  // tslint:disable-next-line:variable-name
  private _allEdges: CytoscapeEdge[];

  constructor(jsonUpp: any) {
    if (jsonUpp) {
      this.jsonString = jsonUpp;
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

  public set nodeLayouter(layouter: Map<string, CytoscapeNodeLayout>) {
    this.layouter = layouter;
  }

  public get nodeLayouter(): Map<string, CytoscapeNodeLayout> {
    return this.layouter;
  }

  public set JSONString(json: string) {
    this.jsonString = json;
  }

  public get JSONString(): string {
    return this.jsonString;
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

    let pathEndIndex = this.addAnchorNodes(this.anchors.upperPath, 0);
    this.addAnchorNodes(this.anchors.upperBlockChains, pathEndIndex);
    pathEndIndex = this.addAnchorNodes(this.anchors.lowerPath, -1, -1);
    this.addAnchorNodes(this.anchors.lowerBlockChains, pathEndIndex);

    const nodesArray = UbirchWebUIUtilsService.mapToArray(this._allNodesMap);
    this._allNodes = nodesArray.map(node => new CytoscapeNode(node, this.layouter));
  }

  private addAnchorNodes(arr: AnchorPathNode[], startAtIndex: number, direction = 1): number {
    let currIndex = startAtIndex;
    let offset = 0;
    // TODO: position index shouldn't be incremented back if node already exists
    arr.forEach((node, index) => {
      const foundNode = this._allNodesMap.get(node.hash);
      if (foundNode && node.nextHash.length === 1) {
        foundNode.addNextHash(node.nextHash[0]);
        offset++;
      } else {
        currIndex = startAtIndex + ((index - offset) * direction);
        node.indexInChain = currIndex;
        this._allNodesMap.set(node.hash, node);
      }
    });
    return currIndex;
  }

  private createEdges() {
    if (this._allNodesMap) {
      this.allNodes.forEach(node => {
        if (node.data) {
          const fullNode = this._allNodesMap.get(node.data.id);
          if (fullNode) {
            fullNode.nextHash.forEach(nextHash =>
            this.createEdgeIfExists(fullNode.hash, nextHash));
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

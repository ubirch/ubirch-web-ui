import {AnchorPathNode} from './anchor-path-node';
import {BlockChainNode} from './block-chain-node';
import {isArray} from 'util';
import {CytoscapeNode} from './cytoscape-node';
import {UbirchWebUIUtilsService} from '../utils/ubirch-web-uiutils.service';
import {CytoscapeEdge} from './cytoscape-edge';
import {CytoscapeNodeLayout} from './cytoscape-node-layout';
import {TimestampNode} from './timestamp-node';

export class Upp {
  private jsonInput: any;
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
      this.jsonInput = jsonUpp;
      this.upp = jsonUpp.upp;
      this.anchors = {
        upperPath: [],
        upperBlockChains: [],
        lowerPath: [],
        lowerBlockChains: []
      };
      if (jsonUpp.anchors) {
        const anchors = jsonUpp.anchors;
        this.readArrayOfAnchorNodes(anchors.upper_path, this.anchors.upperPath, 'AnchorPathNode', true);
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

  public set pureJSON(json: any) {
    this.jsonInput = json;
  }

  public get pureJSON(): any {
    return this.jsonInput;
  }

  public get allNodes(): CytoscapeNode[] {
    if (!this._allNodes) {
      this.createNodes();
    }
    return this._allNodes;
  }

  public getNode(id: string): AnchorPathNode | BlockChainNode {
    if (this._allNodesMap) {
      return this._allNodesMap.get(id);
    }
    return undefined;
  }

  public get allEdges(): CytoscapeEdge[] {
    if (!this._allEdges) {
      this.createEdges();
    }
    return this._allEdges;
  }

  /**
   * takes all arrays of the upp:
   *    - upperPath
   *    - lowerPath
   *    - upperBlockChains
   *    - lowerBlockChains
   * and creates all required nodes from that data and put them into the _allNodesMap:
   *    - if a hash doesn't exist, the node is put into a new bucket of the map
   *    - if a hash already exists, the new nextHash value is added to the nextHashes of the corresponding node
   * Every node has an indexInChain, which defines the position on the x axis of the node.
   * In a first step the positions are positive and negative:
   *    - the UPP has position 0
   *    - the upper path has positions > 0
   *    - the lower path has positions < 0
   * (the position is calculated by index in array, an offset is needed and used to handle nodes that already exists in map)
   * When all nodes are created, the minimum value of the positions is determined and all postions are shifted to be positive
   * Blockchain nodes are treated special:
   *     - an additional timestamp node is created, that displays the blockchain timestamp at the bottom line
   *     - two parent nodes/areas are created for the list upper and lower blockchain anchors
   *     - the parent nodes contain all blockchain nodes of that path and their corresponding timestamp nodes
   */
  private createNodes() {
    if (!this.upp || !this.anchors) {
      this._allNodes = [];
      return;
    }

    this._allNodesMap = new Map<string, AnchorPathNode>();

    let pathEndIndex = this.addAnchorNodes(this.anchors.upperPath, 0);
    this.addAnchorNodes(this.anchors.upperBlockChains, pathEndIndex, 1, 0, 'upperBC');
    pathEndIndex = this.addAnchorNodes(this.anchors.lowerPath, -1, -1,
      this.anchors.lowerBlockChains ? this.anchors.lowerBlockChains.filter(node => node instanceof BlockChainNode).length - 1 : 0);
    this.addAnchorNodes(this.anchors.lowerBlockChains, pathEndIndex, 1, 0, 'lowerBC');

    const nodesArray = this.shiftNodeIndexInChains(
      UbirchWebUIUtilsService.mapToArray(this._allNodesMap));
    this._allNodes = nodesArray.map(node => new CytoscapeNode(node, this.layouter));
  }

  private addAnchorNodes(arr: AnchorPathNode[], startAtIndex: number, direction = 1, endIndexOffset = 0, groupId?: string): number {
    let currIndex = startAtIndex;
    let offset = 0;
    if (groupId !== undefined) {
      if (!this._allNodesMap.get(groupId)) {
        const parentNode = new AnchorPathNode({properties: {hash: groupId}});
        this._allNodesMap.set(groupId, parentNode);
      }
    }
    arr.filter(node => node.type !== 'TIMESTAMP')
      .forEach((node, index) => {
        if (groupId !== undefined) {
          node.parent = groupId;
        }
        const foundNode = this._allNodesMap.get(node.hash);
        if (foundNode && node.nextHash.length === 1) {
          foundNode.addNextHash(node.nextHash[0]);
          offset++;
        } else {
          currIndex = startAtIndex + ((index - offset) * direction);
          if (index === arr.length - 1) { // last element
            currIndex += endIndexOffset * direction;
          }
          node.indexInChain = currIndex;
          this._allNodesMap.set(node.hash, node);
        }
    });
    arr.filter(node => node.type === 'TIMESTAMP')
      .forEach((node: TimestampNode) => {
        if (groupId !== undefined) {
          node.parent = groupId;
        }
        const foundNode = this._allNodesMap.get(node.refHash);
        if (foundNode) {
          node.indexInChain = foundNode.indexInChain;
          this._allNodesMap.set(node.hash, node);
        }
      });
    return currIndex;
  }

  /**
   * shifts the IndexInChains of every node to avoid negative indecees
   * @param arr the Array of AnchorPathNodes to check
   */
  private shiftNodeIndexInChains(arr: AnchorPathNode[]): AnchorPathNode[] {
    // find out the minimum index
    const minIndex = arr.map(node => node.indexInChain).reduce((a, b) => Math.min(a, b));
    if (minIndex < 0) {
      return arr.map(node => {
        node.indexInChain -= minIndex;
        return node;
      });
    }
    return arr;
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

  private readArrayOfAnchorNodes(data: any, target: any[], type: string, addUnsignedUpp: boolean = false) {
    if (data && isArray(data) && data.length > 0) {
      switch (type) {
        case('AnchorPathNode'):
          data.forEach(path => {
            target.push(new AnchorPathNode(path));
            if (path.label === 'UPP') {
              target.push(new TimestampNode({...path, properties: { ...path.properties, next_hash: undefined}}));
            }
          });
          break;
        case('BlockChainNode'):
          data.forEach(path => {
            target.push(new BlockChainNode(path));
            target.push(new TimestampNode(path));
          });
          break;
      }
    } else if (addUnsignedUpp) {
      const settings = {
        id: 'upp_temp' + this.upp,
        label: 'UPP (not yet anchored)',
        properties: {
          hash: this.upp,
          next_hash: '',
          prev_hash: '',
          timestamp: ''
        }
      };
      target.push(new AnchorPathNode(settings));
    }
  }
}

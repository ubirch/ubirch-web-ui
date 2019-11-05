import {AnchorPathNode} from './anchor-path-node';

export class BlockChainNode extends AnchorPathNode {
  public publicChain: string;

  constructor(jsonNode: any) {
    super(jsonNode);
    if (jsonNode) {
      this.publicChain = jsonNode.properties.public_chain;
    }
    return this;
  }
}

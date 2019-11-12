import {AnchorPathNode} from './anchor-path-node';

export class BlockChainNode extends AnchorPathNode {
  public publicChain: string;
  public networkInfo: string;
  public networkType: string;
  public txid: string;
  public blockchain: string;
  public message: string;

  constructor(jsonNode: any) {
    super(jsonNode);
    if (jsonNode) {
      this.publicChain = jsonNode.properties.public_chain;
      this.networkInfo = jsonNode.properties.network_info;
      this.networkType = jsonNode.properties.network_type;
      this.txid = jsonNode.properties.txid;
      this.blockchain = jsonNode.properties.blockchain;
      this.message = jsonNode.properties.message;
    }
    return this;
  }
}

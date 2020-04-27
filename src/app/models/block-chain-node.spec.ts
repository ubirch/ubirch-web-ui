import { BlockChainNode } from './block-chain-node';

describe('BlockChainNode', () => {
  it('should create an instance', () => {
    const jsonNode = {
      properties: {
        public_chain: 'xxxxx',
        network_info: 'xxxxx',
        network_type: 'xxxxx',
        txid: 'xxxxx',
        blockchain: 'xxxxx',
        message: 'xxxxx',
      },
    };

    expect(new BlockChainNode(jsonNode)).toBeTruthy();
  });
});

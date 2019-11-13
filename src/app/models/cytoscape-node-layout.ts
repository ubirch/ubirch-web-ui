export const LAYOUT_SETTINGS = [
  { type: 'UPP',
    nodeIcon: 'assets/app-icons/ubirch_verify_right.png'},
  { type: 'FOUNDATION_TREE',
    nodeIcon: 'assets/app-icons/foundation-tree.svg'},
  { type: 'MASTER_TREE',
    nodeIcon: 'assets/app-icons/master-tree.svg'},
  { type: 'PUBLIC_CHAIN',
    nodeIcon: 'https://live.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'},
  { type: 'iota',
    nodeIcon: 'assets/app-icons/IOTA_verify_right.png'},
  { type: 'etherium',
    nodeIcon: 'assets/app-icons/Ethereum_verify_right.png'},
  { type: 'etherium-classic',
    nodeIcon: 'assets/app-icons/Ethereum-Classic_verify_right.png'}
];

export class CytoscapeNodeLayout {
  public colorCode: string;
  public shapeType: string;
  public nodeIcon: string;

  constructor(
    nodeIcon?: string,
    colorCode?: string,
    shapeType?: string
  ) {
    this.nodeIcon = nodeIcon;
    this.colorCode = colorCode || '#000';
    this.shapeType = shapeType || 'rectangle';
  }
}

export const LAYOUT_SETTINGS = [
  { type: 'UPP',
    nodeIcon: 'https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'},
  { type: 'FOUNDATION_TREE',
    nodeIcon: 'https://live.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'},
  { type: 'MASTER_TREE',
    nodeIcon: 'https://live.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'},
  { type: 'PUBLIC_CHAIN',
    nodeIcon: 'https://live.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'}
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
    this.colorCode = colorCode || 'grey';
    this.shapeType = shapeType || 'ellipse';
  }
}

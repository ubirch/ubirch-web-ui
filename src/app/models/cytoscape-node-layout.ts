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

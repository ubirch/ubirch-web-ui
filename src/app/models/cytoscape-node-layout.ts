export class CytoscapeNodeLayout {
  public colorCode: string;
  public shapeType: string;

  constructor(
    colorCode?: string,
    shapeType?: string
  ) {
  this.colorCode = colorCode || 'grey';
  this.shapeType = shapeType || 'ellipse';

}
}

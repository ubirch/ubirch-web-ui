export class CytoscapeEdge {
  public data: CytoscapeEdgeData;

  constructor(sourceHash: string, targetHash: string ) {
    this.data = new CytoscapeEdgeData(sourceHash, targetHash);

    return this;
  }
}

/**
 * Format:
 *        { data: { source: 'a', target: 'b', colorCode: 'blue', strength: 10 } }
 */
export class CytoscapeEdgeData {
  public source: string;
  public target: string;
  public strength: number;
  public colorCode: string;

  constructor(sourceHash: string, targetHash: string ) {
    this.source = sourceHash;
    this.target = targetHash;

    this.colorCode = 'grey';
    this.strength = 10;

    return this;
  }
}

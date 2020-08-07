import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2} from '@angular/core';
import {CytoscapeGraphService} from '../services/cytoscape-graph.service';
import * as cytoscape from 'cytoscape';
import * as automove from 'cytoscape-automove';

@Component({
  selector: 'ng2-cytoscape',
  template: '<div id="cy"></div>',
  styles: [`#cy {
    height: 100%;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
  }`]
})


export class NgCytoComponent implements OnChanges {
  private static pluginInitialized = false;

  @Input() public elements: any;
  @Input() public style: any;
  @Input() public layout: any;
  @Input() public zoom: any;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  public constructor(
    private renderer: Renderer2,
    private cytoService: CytoscapeGraphService,
    private el: ElementRef
  ) {
    if (!NgCytoComponent.pluginInitialized) {
      // extension should be registered one time only
      // multiple registering will cause an error
      cytoscape.use(automove);

      NgCytoComponent.pluginInitialized = true;
    }

    this.layout = this.layout || {
      name: 'grid',
      directed: true,
      padding: 0
    };

    this.zoom = this.zoom || {
      min: 0.1,
      max: 1.5
    };

    this.style = this.style || cytoscape.stylesheet()

      .selector('node')
      .css({
        'shape': 'data(shapeType)',
        'height': 50,
        'width': 50,
        'text-valign': 'bottom',
        'text-halign': 'center',
        'background-fit': 'cover',
        'border-width': 0,
        'background-image': 'data(nodeIcon)',
        'background-opacity': '0'
      })
      .selector('edge')
      .css({
        'curve-style': 'bezier',
        'opacity': 0.666,
        'width': 'mapData(strength, 70, 100, 2, 6)',
        'target-arrow-shape': 'triangle',
        'line-color': 'data(colorCode)',
        'source-arrow-color': 'data(colorCode)',
        'target-arrow-color': 'data(colorCode)',
      })
      .selector(':parent')
      .css({
        'background-color': '#10dc60',
        'background-opacity': 0.1
      })
      .selector('edge.questionable')
      .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
      })
      .selector('node.UPP')
      .css({
        'content': 'data(label)',
      })
      .selector('node.UPP_UNSIGNED')
      .css({
        'content': 'data(label)',
      })
      .selector('node.PUBLIC_CHAIN')
      .css({
        'content': 'data(subType)',
      })
      .selector('node.TIMESTAMP')
      .css({
        'content': 'data(label)',
        'height': 15,
        'width': 15,
        'text-wrap': 'wrap',
        'margin-top': 20,
      });
  }

  public ngOnChanges(): any {
    this.render();
    console.log(this.el.nativeElement);
  }

  public render() {
    const cyContainer = this.renderer.selectRootElement('#cy');
    const localselect = this.select;
    const cy = cytoscape({
      container: cyContainer,
      layout: this.layout,
      minZoom: this.zoom.min,
      maxZoom: this.zoom.max,
      style: this.style,
      elements: this.elements,
    });

    // TODO: check if no anchors exist -> display unsigned upp node only
      // TODO: if hash has not yet been anchored inform user: 'we received the upp, but it takes time until the anchoring will be done'
    // put timestamp nodes under their corresponding nodes
    cy.filter('[type="PUBLIC_CHAIN"]').forEach(bcNode => {
      const nodeId = bcNode.data.id;
      const tsId = 'timestamp_' + nodeId;
      cy.automove({
        nodesMatching: cy.getElementById(tsId),
        reposition: 'drag',
        dragWith: cy.getElementById(nodeId)
      });
    });

    // move all timestamp nodes down
    cy.filter('[type="TIMESTAMP"]').shift({x: 0, y: 50});

    if (this.cytoService.currentZoomFactor) {
      cy.zoom(this.cytoService.currentZoomFactor);
    }
    // else {
    //   cy.fit();
    // }
    if (this.cytoService.currentPan) {
      cy.pan(this.cytoService.currentPan);
    }
    // else {
    //   cy.center();
    // }

    cy.on('zoom', zoomFactor => {
      this.cytoService.currentZoomFactor = zoomFactor.target._private.zoom;
    });

    cy.on('pan', panPos => {
      this.cytoService.currentPan = panPos.target._private.pan;
    });

    cy.on('tap', 'node', e => {
      const node = e.target;
      if (node.data('type') === 'PUBLIC_CHAIN') {
        localselect.emit(node.data('id'));
      }
    });


  }

}

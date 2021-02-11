import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Data, GenericGraphConfig } from './data';
import { GenericBarChartService } from './generic-bar-chart.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-generic-bar-chart',
  templateUrl: './generic-bar-chart.component.html',
  styleUrls: ['./generic-bar-chart.component.css']
})
export class GenericBarChartComponent implements OnInit {

  @ViewChild('graph', null) graph: ElementRef;

  constructor(private genericBarChartService: GenericBarChartService) { }

  ngOnInit() {

    const graphDetails: GenericGraphConfig = {
      containerID: 'graph',
      containerFill: '#85ada8',
      height: 500,
      width: 700,
      xGrid: {
        visibility: true,
        fill: '#fff',
      },
      yGrid: {
        visibility: true,
        fill: '#fff',
      },
      barWidth: 8,
      prevBar: {
        fill: 'green',
        data: Data.mtdData,
      },
      nextBar: {
        fill: 'steelblue',
        data: Data.mtdData,
      }
    };

    this.genericBarChartService.initGraph(graphDetails);
  }

  pdf() {
    const doc = new jsPDF({
      orientation: 'landscape'
    });

    const temp = {
      '#editor': (element, renderer) => {
        return true;
      }
    };

    const content = this.graph.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 700,
      elementHandlers: temp
    });

    doc.save('two-by-four.pdf');
  }
}

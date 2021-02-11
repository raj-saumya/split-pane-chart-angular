import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { SplitPanesComponent } from './../split-panes.component';
import data from './data.json'
@Component({
  selector: 'app-bar-chart-template',
  templateUrl: './bar-chart-template.component.html',
  styleUrls: ['./bar-chart-template.component.css']
})
export class BarChartTemplateComponent implements OnInit {


  constructor() { }

  height: number;
  width: number;
  graph: string;
  flag = 0;

  @Input('graphID')
  set setGraphID(graphID: any) {
    if (graphID) {
      this.graph = graphID;
      // console.log('graphID -', this.graph);
    }
  }

  @Input('height')
  set setHeight(height: any) {
    if (height) {
      this.height = height;
      if (this.flag) {
        setTimeout(() => {
          // console.log('height - ', this.height);
          // this.initGraph();

        }, 0);
      }
    }
  }

  @Input('width')
  set setWidth(width: any) {
    if (width) {
      this.width = width;
      setTimeout(() => {
        this.flag = 1;
        // console.log('width -', this.width);
        this.initGraph();
      }, 0);
    }
  }

  ngOnInit() {
  }


  initGraph() {

    d3.selectAll(`#${this.graph} svg`).remove();

    const plotData = data.Data.mtdData;

    const margin = {
      top: 20, right: 20, bottom: 30, left: 40
    };
    const width = this.width;
    const height = this.height;

    const upperDomain = d3.max(plotData.map(d =>
      Math.max(d.actual ? d.actual : 0, d.lastYear ? d.lastYear : 0, d.basePlan ? d
        .basePlan : 0)));


    // creating svg container
    const svg =
      //  d3.create('svg')
      d3.select(`#${this.graph}`).append('svg')
        .attr('width', width)
        .attr('height', height + 25)
        .append('g')
        .attr('transform',
          'translate(' + (40) + ',' + -1 + ')');

    // initialising scale
    const x = d3.scaleLinear().range([0, width]).domain([0, 14]);
    const y = d3.scaleLinear().range([height, 0]).domain([0, upperDomain + 5000]);

    // creating Axis
    const xAxis = d3.axisBottom(x).ticks(14).tickSize(-height).tickPadding(10).tickFormat(d => 'A');

    const gX = svg.append('g')
      .attr('transform', 'translate(0,' + (height) + ')')
      .call(xAxis);

    const yAxis = d3.axisLeft(y).tickPadding(8).tickSize(-width);

    const gY = svg.append('g')
      .call(yAxis);

    // custom tick lines
    gX.selectAll('.tick line')
      .style('stroke', '#c1c1c1');


    gY.selectAll('.tick line')
      .style('stroke', '#c1c1c1')
      .attr('transform', 'translate(-5,0)');

    gY.call(g => g.select('.domain').style('stroke', '#c1c1c1'));

    // adding clipping area
    svg.append('clipPath')
      .attr('id', `${this.graph}clip`)
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    const clipping = svg.append('g')
      .attr('clip-path', `url(#${this.graph}clip)`);


    // creating bar chart
    clipping.selectAll('actualYearBar')
      .data(plotData.map(d => d.actual).filter(d => d !== undefined))
      .enter()
      .append('rect')
      .attr('id', 'bar1')
      .attr('height', d => {
        return height - y(d) + 1;
      })
      .attr('y', d => {
        return y(d);
      })
      .attr('width', 8)
      .attr('rx', 1)
      .attr('x', (d, i) => {
        return x(i + 1) - 8 - 4.5;
      })
      .style('fill', '#0076a8');


    clipping.selectAll('lastYearBar')
      .data(plotData.map(d => d.lastYear).filter(d => d !== undefined))
      .enter()
      .append('rect')
      .attr('id', 'bar2')
      .attr('height', d => {
        return height - y(d) + 1;
      })
      .attr('y', d => {
        return y(d);
      })
      .attr('width', 8)
      .attr('rx', 1)
      .attr('x', (d, i) => {
        return x(i + 1) + 4.5;
      })
      .style('fill', '#c1c1c1');


  }

}

import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { GridConfig, BarConfig, DataTemplate, GenericGraphConfig } from './data';

@Injectable({
  providedIn: 'root'
})
export class GenericBarChartService {

  constructor() { }

  private generateSVG(containerID, width, height, margin) {
    return d3.select(`#${containerID}`).append('svg')
      .attr('width', width + margin.left * 1.5)
      .attr('height', height + margin.top)
      .append('g')
      .attr('transform',
        'translate(' + (margin.left) + ',' + 0 + ')');
  }

  private styleXGridLines(gX, xGrid: GridConfig) {
    gX.selectAll('.tick line')
      .style('stroke', xGrid.fill)
      .style('visibility', (d, index) => {
        if (index === 0) {
          return 'visible';
        } else {
          return xGrid.visibility ? 'visible' : 'hidden';
        }
      });

    gX.call(g => g.select('.domain').style('stroke', xGrid.fill));

  }

  private styleYGridLines(gY, yGrid: GridConfig) {
    gY.selectAll('.tick line')
      .style('stroke', yGrid.fill)
      .style('visibility', (d, index) => {
        if (index === gY.selectAll('.tick line')._groups[0].length - 1) {
          return 'hidden';
        } else {
          return yGrid.visibility ? 'visible' : 'hidden';
        }
      })
      .attr('transform', 'translate(-5,0)');

    gY.call(g => g.select('.domain').style('stroke', yGrid.fill));

  }

  private generateBar(clipping, x, y, height, plotData: BarConfig, barWidth, type, flag) {

    clipping.selectAll('prevBar')
      .data(plotData.data)
      .enter()
      .append('rect')
      .attr('id', 'bar1')
      .attr('height', (d: DataTemplate) => {
        return height - y(d['y-value']) + 1;
      })
      .attr('y', (d: DataTemplate) => {
        return y(d['y-value']);
      })
      .attr('width', barWidth)
      .attr('rx', 1)
      .attr('x', (d: DataTemplate, i) => {
        if (type === 'prev') {
          return x(i + 1) + (flag ? -(barWidth + barWidth / 2) : -barWidth / 2);
        } else {
          return x(i + 1) + 4;
        }
      })
      .style('fill', plotData.fill);
  }

  private generateSpline(clipping, x, y, plotData: BarConfig, stroke) {

    const lineConfig = d3.line()
      .x((d: DataTemplate, index) => x(index + 1))
      .defined((d: DataTemplate) => y(d['y-value'])) // Omit empty values.
      .y((d: DataTemplate) => y(d['y-value']))
      // .curve(d3.curveMonotoneX)

    clipping.append('path')
      .datum(plotData.data)
      .attr('fill', 'none')
      .attr('stroke', stroke)
      .attr('stroke-width', 1.5)
      .attr('d', lineConfig);
  }

  private scrollThroughZoom(x, xAxis, gX, gY, graphDetails, clipping) {
    gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
    clipping.selectAll('rect').attr('transform', d3.event.transform);
    this.styleXGridLines(gX, graphDetails.xGrid);
    this.styleYGridLines(gY, graphDetails.yGrid);
  }

  initGraph(graphDetails: GenericGraphConfig) {

    d3.selectAll(`#${graphDetails.containerID} svg`).remove();

    const width = graphDetails.width;
    const height = graphDetails.height;

    const upperDomain = Math.max(...graphDetails.prevBar.data.map(d => d['y-value']));

    const margin = {
      left: (upperDomain.toString().length * 10), top: 30
    };

    // creating svg container
    const svg = this.generateSVG(graphDetails.containerID, width, height, margin);

    // transparent drag-layer
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', graphDetails.containerFill)
      .style('pointer-events', 'all');

    const scalingFactor = 10;

    const widthExtent = Math.max(graphDetails.prevBar.data.length / (scalingFactor - 1), 1);

    // initialising scale
    const x = d3.scaleLinear().range([0, width]).domain([0, scalingFactor]);
    const y = d3.scaleLinear().range([height, 0]).domain([0, upperDomain + upperDomain * 0.5]);

    // creating Axis
    const xAxis = d3.axisBottom(x)
      .ticks(scalingFactor + 1)
      .tickSize(graphDetails.xGrid.visibility ? -height : 0)
      .tickPadding(10)
      .tickFormat(d => {
        if (d !== 0 && d < graphDetails.prevBar.data.length + 1) {
          return graphDetails.prevBar.data[d - 1]['x-label'];
        }
      });

    const gX = svg.append('g')
      .attr('transform', 'translate(0,' + (height) + ')')
      .call(xAxis);

    // custom tick lines
    this.styleXGridLines(gX, graphDetails.xGrid);

    const yAxis = d3.axisLeft(y)
      .tickPadding(8)
      .tickSize(graphDetails.yGrid.visibility ? -width : 0);

    const gY = svg.append('g')
      .call(yAxis);

    // custom tick lines
    this.styleYGridLines(gY, graphDetails.yGrid);

    // adding clipping area
    svg.append('clipPath')
      .attr('id', `${graphDetails.containerID}clip`)
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    const clipping = svg.append('g')
      .attr('clip-path', `url(#${graphDetails.containerID}clip)`);

    // zoom for scroll
    const zoom = d3
      .zoom()
      .scaleExtent([1, 1])
      .translateExtent([[0, 0], [width * widthExtent, height + margin.top]])
      .on('zoom', () => this.scrollThroughZoom(x, xAxis, gX, gY, graphDetails, clipping));

    svg.call(zoom);

    if (graphDetails.nextBar.data) {
      this.generateSpline(clipping, x, y, graphDetails.prevBar, graphDetails.prevBar.fill);
      this.generateBar(clipping, x, y, height, graphDetails.prevBar, graphDetails.barWidth, 'prev', 1);
      this.generateBar(clipping, x, y, height, graphDetails.nextBar, graphDetails.barWidth, 'next', 1);
    } else {
      this.generateBar(clipping, x, y, height, graphDetails.prevBar, graphDetails.barWidth, 'prev', 0);
    }

  }
}

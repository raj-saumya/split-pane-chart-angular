import * as d3 from 'd3';

export class BarChartTemplate {

    data = [{
        area: 'central ',
        value: 1
    },
    {
        area: 'Riverside ',
        value: 3
    },
    {
        area: 'Picton ',
        value: 5
    },
    {
        area: 'Everton ',
        value: 7
    },
    {
        area: 'Kensington ',
        value: 8
    },
    {
        area: 'Kirkdale',
        value: 9
    }];


    initGraph(h, w) {
        d3.selectAll('svg').remove();

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = w - margin.left - margin.right;
        const height = h - margin.top - margin.bottom;

        // creating svg container
        const svg =
            //  d3.create('svg')
            d3.select('#graph').append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform',
                    'translate(' + (margin.left) + ',' + margin.top + ')');

        // initialising scale
        let x = d3.scaleLinear().range([0, width]).domain([0, 80]);
        let y = d3.scaleLinear().range([height, 0]).domain([0, 10]);

        // zoom for scrolling functionality
        const zoom = d3.zoom()
            .scaleExtent([1, 1])
            .translateExtent([
                [0, 0],
                [width * 3 + 20, height + 50]
            ])
            .on('zoom', zoomed);

        svg.call(zoom);


        // scrolling via dragging anywhere on the screen
        svg.append('rect')
            .attr('id', 'canvas')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('pointer-events', 'all');

        // creating Axis
        const xAxis = d3.axisBottom(x).ticks(100).tickSize(-1000).tickPadding(10)
            .tickFormat(d => {
                if (!(d % 10)) {
                    return d;
                }
            });

        const gX = svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        const yAxis = d3.axisLeft(y);

        const gY = svg.append('g')
            .call(yAxis);


        // custom tick lines
        gX.selectAll('.tick line')
            .style('stroke', d => {
                if (!(d % 10)) {
                    return '#7d7d7d'
                }
                return '#e2e2e2';
            });


        // adding clipping area
        svg.append('clipPath')
            .attr('id', 'clip')
            .append('rect')
            .attr('width', width)
            .attr('height', height);

        const clipping = svg.append('g')
            .attr('clip-path', 'url(#clip)');


        // creating bar chart
        clipping.selectAll('rect')
            .data(this.data)
            .enter()
            .append('rect')
            .attr('id', 'bar')
            .attr('height', function (d) {
                return height - y(d.value);
            })
            .attr('y', function (d, i) {
                return y(d.value) + 2;
            })
            .attr('width', 8)
            .attr('rx', 4)
            .attr('x', (d, i) => {
                return x((i + 1) * 10) - 3;
            })
            .style('fill', '#FF5722');


        function zoomed() {
            clipping.selectAll('rect')
                .attr('transform', d3.event.transform);

            gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));

            gX.selectAll('.tick line')
                .style('stroke', d => {
                    if (!(d % 10)) {
                        return '#7d7d7d'
                    }
                    return '#e2e2e2';
                });
        }
    }

}
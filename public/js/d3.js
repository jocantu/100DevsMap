const svg = d3.select('.canvas')
  .append('svg')
    .attr('width', 500)
    .attr('height', 300)

// create margins and dimensions
const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 50
}
const graphWdith = 300 - margin.left - margin.right
const graphHeight = 300 - margin.top - margin.bottom

const graph = svg.append('g')
  .attr('width', graphWdith)
  .attr('height', graphHeight)
  .attr('transform',`translate(${margin.left},${margin.top})`)

const xAxisGroup = graph.append('g')
  .attr('transform', `translate(0, ${graphHeight})`)
const yAxisGroup = graph.append('g')

data = genderData
  const min = d3.min(data, d => d.count)
  const max = d3.max(data, d => d.count)
  const extent = d3.extent(data, d=> d.count)

  // linear scale
  const y = d3.scaleLinear()
    .domain([0,max])
    .range([graphHeight,0])


  const x = d3.scaleBand()
    .domain(data.map(item => item._id))
    .range([0,300])
    .paddingInner(0.2)
    .paddingOuter(0.2)

  
  // join the data

  const rects = graph.selectAll('rect')
    .data(data)

  rects.attr('width', x.bandwidth)
    .attr('height', d => graphHeight - y(d.count))
    .attr('fill', 'orange')
    .attr('x', d => x(d._id))
    .attr('y', d => y(d.count))

  // append the enter selection to the DOM
  rects.enter()
    .append('rect')
      .attr('width', x.bandwidth)
      .attr('height', d => graphHeight - y(d.count))
      .attr('fill', 'orange')
      .attr('x', d => x(d._id))
      .attr('y', d => y(d.count))

  // create and call the axes
  const xAxis = d3.axisBottom(x)
  const yAxis = d3.axisLeft(y)
    .ticks(4)
    .tickFormat(d => d)

  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)

  xAxisGroup.selectAll('text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')
    .attr('fill', 'orange')

// Pie Chart

const svg2 = d3.select('#ageGroups')
  .append('svg')
    .attr('width', 300)
    .attr('height', 200)


const dims = {height: 150, width: 150, radius: 75}
const cent = {x: (dims.width/2 + 5), y: (dims.height/2)}

svg2.append('svg')
  .attr('width', dims.width + 150)
  .attr('height', dims.height + 150)
  

const graph2 = svg2.append('g')
  .attr('transform', `translate(${cent.x}, ${cent.y})`)
  

const pie = d3.pie()
  .sort(null)
  .value(d => d.count)

const arcPath = d3.arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2)

const colour = d3.scaleOrdinal(d3['schemeSet1'])

//legend setup
const legendGroup = svg2.append('g')
  .attr('transform',`translate(${dims.width + 40},10)`)
const legend = d3.legendColor()
  .shape('circle')
  .shapePadding(40)
  .scale(colour)

// update color scale domain
colour.domain(data2.map(d => d._id))

// update and call legend
legendGroup.call(legend)


// join data to path elements

const paths = graph2.selectAll('path')
  .data(pie(data2))

paths.enter()
  .append('path')
    .attr('class', 'arc')
    .attr('d', arcPath)
    .attr('stroke', '#fff')
    .attr('stroke-width', 3)
    .attr('fill',d => colour(d.data._id))


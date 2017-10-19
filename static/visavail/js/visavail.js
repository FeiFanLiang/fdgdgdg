function visavailChart () {
  // define chart layout
  let margin = {
    // top margin includes title and legend
    top: 70,
    // right margin should provide space for last horz. axis title
    right: 40,
    bottom: 20,
    // left margin should provide space for y axis titles
    left: 100
  }
  // height of horizontal data bars
  let dataHeight = 30
  // spacing between horizontal data bars
  let lineSpacing = 20
  // vertical space for heading
  let paddingTopHeading = -50
  // vertical overhang of vertical grid lines on bottom
  let paddingBottom = 10
  // space for y axis titles
  let paddingLeft = -100
  let width = 940 - margin.left - margin.right
  // title of chart is drawn or not (default: yes)
  let drawTitle = 1
  // year ticks to be emphasized or not (default: yes)
  let emphasizeYearTicks = 1
  // define chart pagination
  // max. no. of datasets that is displayed, 0: all (default: all)
  let maxDisplayDatasets = 0
  // dataset that is displayed first in the current
  // display, chart will show datasets "curDisplayFirstDataset" to
  // "curDisplayFirstDataset+maxDisplayDatasets"
  let curDisplayFirstDataset = 0
  // global div for tooltip
  let div = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

  let definedBlocks = null
  let customCategories = null
  let isDateOnlyFormat = null

  function chart (selection) {
    selection.each(function (dataset) {
      // check which subset of datasets have to be displayed
      let maxPages = 0
      let startSet
      let endSet
      if (maxDisplayDatasets !== 0) {
        startSet = curDisplayFirstDataset
        if (curDisplayFirstDataset + maxDisplayDatasets > dataset.length) {
          endSet = dataset.length
        } else {
          endSet = curDisplayFirstDataset + maxDisplayDatasets
        }
        maxPages = Math.ceil(dataset.length / maxDisplayDatasets)
      } else {
        startSet = 0
        endSet = dataset.length
      }
      // append data attribute in HTML for pagination interface
      selection.attr('data-max-pages', maxPages)
      let noOfDatasets = endSet - startSet
      let height = dataHeight * noOfDatasets + lineSpacing * noOfDatasets - 1
      // check how data is arranged
      if (definedBlocks === null) {
        definedBlocks = 0
        for (let i = 0; i < dataset.length; i++) {
          if (dataset[i].data[0].length === 3) {
            definedBlocks = 1
            break
          } else {
            if (definedBlocks) {
              throw new Error(
                'Detected different data formats in input data. Format can either be ' +
                  'continuous data format or time gap data format but not both.'
              )
            }
          }
        }
      }
      // check if data has custom categories
      if (customCategories === null) {
        customCategories = 0
        for (let i = 0; i < dataset.length; i++) {
          if (dataset[i].data[0][1] != 0 && dataset[i].data[0][1] != 1) {
            customCategories = 1
            break
          }
        }
      }
      // parse data text strings to JavaScript date stamps
      let parseDate = d3.time.format('%Y-%m-%d')
      let parseDateTime = d3.time.format('%Y-%m-%d %H:%M:%S')
      let parseDateRegEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/)
      let parseDateTimeRegEx = new RegExp(
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
      )
      if (isDateOnlyFormat === null) {
        isDateOnlyFormat = true
      }
      dataset.forEach(d => {
        d.data.forEach(d1 => {
          if (!(d1[0] instanceof Date)) {
            if (parseDateRegEx.test(d1[0])) {
              // d1[0] is date without time data
              d1[0] = parseDate.parse(d1[0])
            } else if (parseDateTimeRegEx.test(d1[0])) {
              // d1[0] is date with time data
              d1[0] = parseDateTime.parse(d1[0])
              isDateOnlyFormat = false
            } else {
              throw new Error(
                "Date/time format not recognized. Pick between 'YYYY-MM-DD' or " +
                  "'YYYY-MM-DD HH:MM:SS'."
              )
            }
            if (!definedBlocks) {
              d1[2] = d3.time.second.offset(d1[0], d.interval_s)
            } else {
              if (parseDateRegEx.test(d1[2])) {
                // d1[2] is date without time data
                d1[2] = parseDate.parse(d1[2])
              } else if (parseDateTimeRegEx.test(d1[2])) {
                // d1[2] is date with time data
                d1[2] = parseDateTime.parse(d1[2])
              } else {
                throw new Error(
                  "Date/time format not recognized. Pick between 'YYYY-MM-DD' or " +
                    "'YYYY-MM-DD HH:MM:SS'."
                )
              }
            }
          }
        })
      })

      // 按日期将数据分组形成时间块
      dataset.forEach((series, seriesI) => {
        let tmpData = []
        let dataLength = series.data.length
        series.data.forEach((d, i) => {
          if (i !== 0 && i < dataLength) {
            if (d[1] === tmpData[tmpData.length - 1][1]) {
              // the value has not changed since the last date
              if (definedBlocks) {
                if (
                  tmpData[tmpData.length - 1][2].getTime() === d[0].getTime()
                ) {
                  // end of old and start of new block are the same
                  tmpData[tmpData.length - 1][2] = d[2]
                  tmpData[tmpData.length - 1][3] = 1
                } else {
                  tmpData.push(d)
                }
              } else {
                tmpData[tmpData.length - 1][2] = d[2]
                tmpData[tmpData.length - 1][3] = 1
              }
            } else {
              // the value has changed since the last date
              d[3] = 0
              if (!definedBlocks) {
                // extend last block until new block starts
                tmpData[tmpData.length - 1][2] = d[0]
              }
              tmpData.push(d)
            }
          } else if (i === 0) {
            d[3] = 0
            tmpData.push(d)
          }
        })
        dataset[seriesI].disp_data = tmpData
      })

      // determine start and end dates among all nested datasets
      let startDate = 0
      let endDate = 0

      dataset.forEach((series, seriesI) => {
        if (series.disp_data.length > 0) {
          if (startDate === 0) {
            startDate = series.disp_data[0][0]
            endDate = series.disp_data[series.disp_data.length - 1][2]
          } else {
            if (series.disp_data[0][0] < startDate) {
              startDate = series.disp_data[0][0]
            }
            if (series.disp_data[series.disp_data.length - 1][2] > endDate) {
              endDate = series.disp_data[series.disp_data.length - 1][2]
            }
          }
        }
      })

      // 定义比例
      let xScale = d3.time
        .scale()
        .domain([startDate, endDate])
        .range([0, width])
        .clamp(1)

      // 定义轴
      let xAxis = d3.svg
        .axis()
        .scale(xScale)
        .orient('top')

      // 创建SVG元素
      let svg = d3
        .select(this)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // 创建基本元素组
      svg.append('g').attr('id', 'g_title')
      svg.append('g').attr('id', 'g_axis')
      svg.append('g').attr('id', 'g_data')

      // 创建y轴标签
      let labels = svg
        .select('#g_axis')
        .selectAll('text')
        .data(dataset.slice(startSet, endSet))
        .enter()

      // 文本标签
      labels
        .append('text')
        .attr('x', paddingLeft)
        .attr('y', lineSpacing + dataHeight / 2)
        .text(function (d) {
          if (!(d.measure_html != null)) {
            return d.measure
          }
        })
        .attr('transform', (d, i) => {
          return 'translate(0,' + (lineSpacing + dataHeight) * i + ')'
        })
        .attr('class', d => {
          let returnCSSClass = 'ytitle'
          if (d.measure_url != null) {
            returnCSSClass = returnCSSClass + ' link'
          }
          return returnCSSClass
        })
        .on('click', d => {
          if (d.measure_url != null) {
            return window.open(d.measure_url)
          }
          return null
        })

      // HTML 标签
      labels
        .append('foreignObject')
        .attr('x', paddingLeft)
        .attr('y', lineSpacing)
        .attr('transform', (d, i) => {
          return 'translate(0,' + (lineSpacing + dataHeight) * i + ')'
        })
        .attr('width', -1 * paddingLeft)
        .attr('height', dataHeight)
        .attr('class', 'ytitle')
        .html(d => {
          if (d.measure_html != null) {
            return d.measure_html
          }
        })

      // 创建垂直网格
      svg
        .select('#g_axis')
        .selectAll('line.vert_grid')
        .data(xScale.ticks())
        .enter()
        .append('line')
        .attr({
          class: 'vert_grid',
          x1 (d) {
            return xScale(d)
          },
          x2 (d) {
            return xScale(d)
          },
          y1: 0,
          y2:
            dataHeight * noOfDatasets +
            lineSpacing * noOfDatasets -
            1 +
            paddingBottom
        })

      // 创建水平网格
      svg
        .select('#g_axis')
        .selectAll('line.horz_grid')
        .data(dataset)
        .enter()
        .append('line')
        .attr({
          class: 'horz_grid',
          x1: 0,
          x2: width,
          y1 (d, i) {
            return (lineSpacing + dataHeight) * i + lineSpacing + dataHeight / 2
          },
          y2 (d, i) {
            return (lineSpacing + dataHeight) * i + lineSpacing + dataHeight / 2
          }
        })

      // create x axis
      svg
        .select('#g_axis')
        .append('g')
        .attr('class', 'axis')
        .call(xAxis)

      // make y groups for different data series
      let g = svg
        .select('#g_data')
        .selectAll('.g_data')
        .data(dataset.slice(startSet, endSet))
        .enter()
        .append('g')
        .attr('transform', (d, i) => {
          return 'translate(0,' + (lineSpacing + dataHeight) * i + ')'
        })
        .attr('class', 'dataset')

      // add data series
      g
        .selectAll('rect')
        .data(function (d) {
          return d.disp_data
        })
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return xScale(d[0])
        })
        .attr('y', lineSpacing)
        .attr('width', function (d) {
          return xScale(d[2]) - xScale(d[0])
        })
        .attr('height', dataHeight)
        .attr('class', function (d) {
          if (customCategories) {
            let series = dataset.find(function (series) {
              return series.disp_data.indexOf(d) >= 0
            })
            if (series && series.categories) {
              d3.select(this).attr('fill', series.categories[d[1]].color)
              return ''
            }
          } else {
            if (d[1] === 1) {
              // data available
              return 'rect_has_data'
            } else {
              // no data available
              return 'rect_has_no_data'
            }
          }
        })
        .on('mouseover', function (d, i) {
          let matrix = this.getScreenCTM().translate(
            +this.getAttribute('x'),
            +this.getAttribute('y')
          )
          d3.select(this).style('fill', 'rgba(0,0,0,0.8)')
          div
            .transition()
            .duration(200)
            .style('opacity', 0.9)
          div
            .html(function () {
              let output = ''
              if (customCategories) {
                // custom categories: display category name
                output = '&nbsp;' + d[1] + '&nbsp;'
              } else {
                if (d[1] === 1) {
                  // checkmark icon
                  output = '<i class="fa fa-fw fa-check tooltip_has_data"></i>'
                } else {
                  // cross icon
                  output =
                    '<i class="fa fa-fw fa-times tooltip_has_no_data"></i>'
                }
              }
              if (isDateOnlyFormat) {
                if (d[2] > d3.time.second.offset(d[0], 86400)) {
                  return (
                    output +
                    moment(parseDate(d[0])).format('l') +
                    ' - ' +
                    moment(parseDate(d[2])).format('l')
                  )
                }
                return output + moment(parseDate(d[0])).format('l')
              } else {
                if (d[2] > d3.time.second.offset(d[0], 86400)) {
                  return (
                    output +
                    moment(parseDateTime(d[0])).format('l') +
                    ' ' +
                    moment(parseDateTime(d[0])).format('LTS') +
                    ' - ' +
                    moment(parseDateTime(d[2])).format('l') +
                    ' ' +
                    moment(parseDateTime(d[2])).format('LTS')
                  )
                }
                return (
                  output +
                  moment(parseDateTime(d[0])).format('LTS') +
                  ' - ' +
                  moment(parseDateTime(d[2])).format('LTS')
                )
              }
            })
            .style('left', function () {
              return window.pageXOffset + matrix.e + 'px'
            })
            .style('top', function () {
              return window.pageYOffset + matrix.f - 11 + 'px'
            })
            .style('height', dataHeight + 11 + 'px')
        })
        .on('mouseout', function (d) {
          div
            .transition()
            .duration(500)
            .style('opacity', 0)
          let series = dataset.find(function (series) {
            return series.disp_data.indexOf(d) >= 0
          })
          d3.select(this).style('fill', series.categories[d[1]].color)
        })

      // rework ticks and grid for better visual structure
      function isYear (t) {
        return +t === +new Date(t.getFullYear(), 0, 1, 0, 0, 0)
      }

      function isMonth (t) {
        return +t === +new Date(t.getFullYear(), t.getMonth(), 1, 0, 0, 0)
      }

      let xTicks = xScale.ticks()
      let isYearTick = xTicks.map(isYear)
      let isMonthTick = xTicks.map(isMonth)
      // year emphasis
      // ensure year emphasis is only active if years are the biggest clustering unit
      if (
        emphasizeYearTicks &&
        !isYearTick.every(function (d) {
          return d === true
        }) &&
        isMonthTick.every(function (d) {
          return d === true
        })
      ) {
        d3.selectAll('g.tick').each(function (d, i) {
          if (isYearTick[i]) {
            d3.select(this).attr({
              class: 'x_tick_emph'
            })
          }
        })
        d3.selectAll('.vert_grid').each(function (d, i) {
          if (isYearTick[i]) {
            d3.select(this).attr({
              class: 'vert_grid_emph'
            })
          }
        })
      }

      // 创建标题
      if (drawTitle) {
        svg
          .select('#g_title')
          .append('text')
          .attr('x', paddingLeft)
          .attr('y', paddingTopHeading)
          .text('数据图表')
          .attr('class', 'heading')
      }

      // 创建小标题
      let subtitleText = ''
      if (isDateOnlyFormat) {
        subtitleText =
          '从 ' +
          moment(parseDate(startDate)).format('MMMM Y') +
          ' 到 ' +
          moment(parseDate(endDate)).format('MMMM Y')
      } else {
        subtitleText =
          '从 ' +
          moment(parseDateTime(startDate)).format('l') +
          ' ' +
          moment(parseDateTime(startDate)).format('LTS') +
          ' 到 ' +
          moment(parseDateTime(endDate)).format('l') +
          ' ' +
          moment(parseDateTime(endDate)).format('LTS')
      }

      svg
        .select('#g_title')
        .append('text')
        .attr('x', paddingLeft)
        .attr('y', paddingTopHeading + 17)
        .text(subtitleText)
        .attr('class', 'subheading')

      // create legend
      if (!customCategories) {
        let legend = svg
          .select('#g_title')
          .append('g')
          .attr('id', 'g_legend')
          .attr('transform', 'translate(0,-12)')

        legend
          .append('rect')
          .attr('x', width + margin.right - 150)
          .attr('y', paddingTopHeading)
          .attr('height', 15)
          .attr('width', 15)
          .attr('class', 'rect_has_data')

        legend
          .append('text')
          .attr('x', width + margin.right - 150 + 20)
          .attr('y', paddingTopHeading + 8.5)
          .text('Data available')
          .attr('class', 'legend')

        legend
          .append('rect')
          .attr('x', width + margin.right - 150)
          .attr('y', paddingTopHeading + 17)
          .attr('height', 15)
          .attr('width', 15)
          .attr('class', 'rect_has_no_data')

        legend
          .append('text')
          .attr('x', width + margin.right - 150 + 20)
          .attr('y', paddingTopHeading + 8.5 + 15 + 2)
          .text('No data available')
          .attr('class', 'legend')
      }
    })
  }

  chart.width = function (_) {
    if (!arguments.length) return width
    width = _ - margin.left - margin.right
    return chart
  }

  chart.drawTitle = function (_) {
    if (!arguments.length) return drawTitle
    drawTitle = _
    return chart
  }

  chart.maxDisplayDatasets = function (_) {
    if (!arguments.length) return maxDisplayDatasets
    maxDisplayDatasets = _
    return chart
  }

  chart.curDisplayFirstDataset = function (_) {
    if (!arguments.length) return curDisplayFirstDataset
    curDisplayFirstDataset = _
    return chart
  }

  chart.emphasizeYearTicks = function (_) {
    if (!arguments.length) return emphasizeYearTicks
    emphasizeYearTicks = _
    return chart
  }

  return chart
}

<template lang="html">
    <div id="car-arrange-page">
        <p id="chart" ></p>
    </div>
</template>
<script>
export default {
  mounted() {
    let width
    this.$nextTick(() => {
      width = document.getElementById('car-arrange-page').offsetWidth
      console.log(width)
      this.createChart(width)
    })
  },
  data() {
    return {
      d3Chart: {}
    }
  },
  methods: {
    createChart(width = 1200) {
      console.log(width)
      const chartData = [
        {
          measure: '于长君',
          categories: {
            接机: { color: 'rgba(0,178,102, 0.5)' },
            送机: { color: 'rgba(255,51,0, 0.5)' }
          },
          data: [
            ['2017-10-19 07:20:00', '接机', '2017-10-19 08:02:00'],
            ['2017-10-19 08:45:00', '送机', '2017-10-19 09:13:00'],
            ['2017-10-19 09:30:00', '接机', '2017-10-19 10:30:00'],
            ['2017-10-19 14:50:00', '送机', '2017-10-19 15:50:00']
          ]
        },
        {
          measure: '曾庆伟',
          categories: {
            接机: { color: 'rgba(0,178,102, 0.5)' },
            送机: { color: 'rgba(255,51,0, 0.5)' }
          },
          data: [
            ['2017-10-19 11:45:00', '送机', '2017-10-19 12:45:00'],
            ['2017-10-19 11:50:00', '送机', '2017-10-19 12:50:00'],
            ['2017-10-19 13:20:00', '接机', '2017-10-19 14:20:00'],
            ['2017-10-19 14:00:00', '接机', '2017-10-19 15:00:00'],
            ['2017-10-19 14:00:00', '接机', '2017-10-19 15:00:00'],
            ['2017-10-19 18:00:00', '接机', '2017-10-19 19:00:00'],
            ['2017-10-19 18:10:00', '送机', '2017-10-19 19:10:00'],
            ['2017-10-19 18:20:00', '送机', '2017-10-19 19:20:00'],
            ['2017-10-19 20:35:00', '送机', '2017-10-19 22:31:00']
          ]
        }
      ]

      $('#chart').empty()
      let chart = visavailChart().width(width)
      this.d3Chart = d3
        .select('#chart')
        .datum(chartData)
        .call(chart)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

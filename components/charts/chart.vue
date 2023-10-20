<template>
  <apexchart :options="chartOptions" :series="series" />
</template>

<script>
export default {
  name: 'Chart',
  components: {
    [process.browser && 'apexchart']: () => import('vue-apexcharts'),
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => []
    },
    dataLabels: {
      type: Boolean,
      default: false
    },
    series: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    zoom: {
      type: Boolean,
      default: false
    },
    yaxis: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    chartOptions() {
      return {
        type: this.type,
        chart: {
          type: this.type,
          zoom: {
            enabled: this.zoom
          },
        },
        colors: this.colors,
        dataLabels: {
          enabled: this.dataLabels
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: this.title,
          align: 'left'
        },
        stroke: {
          width: [0, 4]
        },
        xaxis: {
          categories: this.categories
        },
        yaxis: this.yaxis
      }
    }
  }
}
</script>

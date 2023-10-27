<template>
  <apexchart :options="chartOptions" :series="series" :height="height" />
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
    legend: {
      type: Boolean,
      default: true
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
    },
    height: {
      type: String,
      default: "400"
    },
  },
  computed: {
    chartOptions() {
      return {
        legend: {
          show: this.legend
        },
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
        yaxis: this.yaxis,
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: 10,
              offsetY: 0
            }
          }
        }],
      }
    }
  }
}
</script>

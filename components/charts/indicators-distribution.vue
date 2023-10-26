<template>
  <Chart 
    title="Distribuição Indicadores de Extensão Universitária" 
    type="line" 
    height="400"
    :series="series" 
    :yaxis="yaxis" 
  />
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from './chart'
import formSteps from '~/assets/form-steps.json'

export default {
  name: 'IndicatorsDistribution',
  components: {
    Chart
  },
  computed: {
    ...mapGetters('formData', ['formattedData', 'groupedIndicators']),
    totalIndicators() {
      return this.formattedData.indicators.length
    },
    indicatorsConfig() {
      const index = formSteps.stepNumber['indicators']
      const indicatorsConfig = formSteps.steps[index]

      return indicatorsConfig.map(item => ({
        name: item.title,
        category: item.dataLabel,
        color: item.hexColor
      }))
    },
    indicatorData() {
      return this.indicatorsConfig.map(item => ({
        x: item.name.split(" ")[0],
        y: this.groupedIndicators[item.category] || 0,
        fillColor: item.color
      }))
    },
    indicatorPercentages() {
      return this.indicatorsConfig.map(item => ({
        x: '',
        y: this.getPercentage(item.category)
      }))
    },
    series() {
      return [{
        name: 'Quantidade',
        type: 'column',
        data: this.indicatorData
      }, {
        name: 'Porcentagem',
        type: 'line',
        data: this.indicatorPercentages
      }]
    },
    yaxis() {
      return [{
        title: {
          text: 'Quantidade',
        },

      }, {
        opposite: true,
        title: {
          text: 'Porcentagem (%)'
        }
      }]
    }
  },
  methods: {
    getPercentage(category) {
      const value = (this.groupedIndicators[category] / this.totalIndicators) * 100
      return this.groupedIndicators[category] ? value.toFixed(2) : 0
    }
  }
}
</script>

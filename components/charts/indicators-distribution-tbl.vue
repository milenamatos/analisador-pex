<template>
  <Chart 
    title="Percentual de Distribuição dos indicadores - TBL" 
    subtitle="O gráfico abaixo apresenta a distribuição do percentual da pontuação dos indicadores selecionados sobre a pontuação total, agrupados de acordo com os pilares do TBL"
    type="bar" 
    height="350"
    :categories="categories" 
    :series="series" 
    :yaxis="yaxis" 
  />
</template>

<script>
import { mapState } from 'vuex'
import Chart from './chart'
import formSteps from '~/assets/form-steps.json'
import { getDistributionPercentageByIndicator } from '~/assets/utils/analysis-data'

export default {
  name: 'IndicatorsDistributionTBL',
  components: {
    Chart
  },
  computed: {
    ...mapState('formData', ['analysisData']),
    series() {
      const index = formSteps.stepNumber['indicators']
      const indicatorsConfig = formSteps.steps[index]

      const data = this.analysisData?.pointsDistribution

      return data ?
        indicatorsConfig.map(item => ({
          name: item.title,
          color: item.hexColor,
          data: getDistributionPercentageByIndicator(data, item.title).map(item => item.value)
        })) : []
    },
    categories() {
      const data = this.analysisData?.pointsDistribution?.[0]
      return data ? data.goals.map(item => item.goal) : []
    },
    yaxis() {
      return [{
        title: {
          text: 'Percentual',
        }
      }]
    }
  }
}
</script>

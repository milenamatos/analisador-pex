<template>
  <Chart 
    title="Percentual de Distribuição dos indicadores - BSC" 
    subtitle="O gráfico abaixo apresenta a distribuição do percentual da pontuação dos indicadores selecionados sobre a pontuação total, agrupados de acordo com os quadrantes do BSC"
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
import { getDistributionPercentageByGoal } from '~/assets/utils/analysis-data'

export default {
  name: 'IndicatorsDistributionBSC',
  components: {
    Chart
  },
  computed: {
    ...mapState('formData', ['analysisData']),
    series() {
      const index = formSteps.stepNumber['keywords']
      const keywordsConfig = formSteps.steps[index]

      const data = this.analysisData.pointsDistribution
      
      return keywordsConfig.map(item => ({
        name: item.title,
        color: item.hexColor,
        data: getDistributionPercentageByGoal(data, item.title).map(item => item.value)
      }))
    },
    categories() {
      const data = this.analysisData.pointsDistribution
      return data.map(item => item.indicator)
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

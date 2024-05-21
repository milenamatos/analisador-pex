<template>
  <Chart 
    title="Distribuição dos ODS" 
    subtitle="O gráfico abaixo apresenta a quantidade de relacionamentos observados de cada ODS, de forma direta e indireta"
    type="bar" 
    :categories="categories"
    :series="series" 
    :yaxis="yaxis" 
  />
</template>

<script>
import { mapState } from 'vuex'
import Chart from './chart'
import { getGoalDistribution } from '~/assets/utils/analysis-data'

export default {
  name: 'GoalsDistribution',
  components: {
    Chart
  },
  computed: {
    ...mapState('goal', ['goals']),
    ...mapState('formData', ['analysisData']),
    goalIds() {
      return Object.keys(this.goals)
    },
    categories() {
      return this.goalIds.map(goalId => `ODS ${goalId}`)
    },
    formattedData() {
      const data = this.analysisData.goalsDistribution
      return {
        direct: this.goalIds.map(goalId => getGoalDistribution(data, goalId, 'direct')),      
        indirect: this.goalIds.map(goalId => getGoalDistribution(data, goalId, 'indirect'))   
      }
    },
    series() {
      return [{
        name: 'Direto',
        data: this.formattedData.direct
      }, {
        name: 'Indireto',
        data: this.formattedData.indirect
      }]
    },
    yaxis() {
      return [{
        title: {
          text: 'Quantidade',
        },
      }]
    }
  }
}
</script>

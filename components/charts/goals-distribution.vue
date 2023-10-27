<template>
  <Chart 
    title="Distribuição dos ODS" 
    type="bar" 
    :categories="categories"
    :series="series" 
    :yaxis="yaxis" 
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Chart from './chart'

export default {
  name: 'IndicatorsDistribution',
  components: {
    Chart
  },
  computed: {
    ...mapState('keyword', ['goals']),
    ...mapGetters('formData', ['getGoalDistribution']),
    goalIds() {
      return Object.keys(this.goals)
    },
    categories() {
      return this.goalIds.map(goalId => `ODS ${goalId}`)
    },
    formattedData() {
      return {
        direct: this.goalIds.map(goalId => this.getGoalDistribution(goalId, 'direct')),      
        indirect: this.goalIds.map(goalId => this.getGoalDistribution(goalId, 'indirect'))   
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

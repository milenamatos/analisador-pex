<template>
  <Chart 
    title="Distribuição ODS" 
    type="bar" 
    :categories="categories"
    :series="series" 
    :yaxis="yaxis" 
  />
</template>

<script>
import { mapState } from 'vuex'
import Chart from './chart'

export default {
  name: 'IndicatorsDistribution',
  components: {
    Chart
  },
  computed: {
    ...mapState('keyword', ['goals']),
    ...mapState('formData', ['goalsDistribution']),
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
      console.log(this.formattedData.direct)
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
  },
  methods: {
    getGoalDistribution(goalId, relation) {
      return this.goalsDistribution.find(item => item.id == goalId && item.relation === relation)?.count || 0
    }
  }
}
</script>

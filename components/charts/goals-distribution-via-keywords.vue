<template>
  <Chart 
    title="Distribuição dos ODS de acordo com os tópicos" 
    subtitle="O gráfico abaixo apresenta a quantidade dos ODS de acordo com os tópicos selecionados"
    type="bar" 
    :categories="categories"
    :series="series" 
    :yaxis="yaxis" 
  />
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from './chart'

export default {
  name: 'GoalsDistributionViaKeywords',
  components: {
    Chart
  },
  computed: {
    ...mapGetters('goal', ['goals']),
    ...mapGetters('formData', ['formattedData']),
    ...mapGetters('keyword', ['keywordList']),
    goalIds() {
      return Object.keys(this.goals)
    },
    selectedKeywordList() {
      return this.formattedData.keywords.map(item => this.keywordList[item.id])
    },
    categories() {
      return this.goalIds.map(goalId => `ODS ${goalId}`)
    },
    series() {
      return [{
        name: 'Quantidade',
        type: 'column',
        data: this.goalIds.map(goalId => this.getGoalCount(goalId))
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
    getGoalCount(goalId) {
      const filtered = this.formattedData.keywords.filter(item => {
        const keyword = this.keywordList[item.id]
        return keyword.goals.some(goal => goal.id == goalId)
      })
      return filtered.length || 0
    }
  }
}
</script>

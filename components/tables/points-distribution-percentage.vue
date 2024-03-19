<template>
  <cv-data-table 
    class="table"
    title="Pontuação BSC - percentual"
    helperText="A tabela abaixo apresenta o percentual da pontuação dos indicadores selecionados sobre a pontuação total"
  >
    <template v-slot:headings>
      <cv-data-table-heading heading="Indicador" name="" />

      <cv-data-table-heading 
        v-for="item in goals"
        :key="item.goal"
        :heading="item.goal"
        :name="item.goal"
      />
    </template>

    <template v-slot:data>
      <cv-data-table-row 
        v-for="item in indicatorsConfig"
        :key="item.title"
      >
        <cv-data-table-cell :style="item.style">
          {{ item.title }}
        </cv-data-table-cell>

        <cv-data-table-cell 
          v-for="goal in getIndicatorGoalsPercentage(item.title)"
          :key="goal.goal"
        >
          {{ goal.value }}%
        </cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>


</template>

<script>
import { mapState } from 'vuex'
import formSteps from '~/assets/form-steps.json'

export default {
  name: 'PoalsDistributionPercentage',
  computed: {
    ...mapState('formData', ['analysisData']),
    indicatorsConfig() {
      const index = formSteps.stepNumber['indicators']
      return formSteps.steps[index]
    },
    pointsDistribution() {
      return this.analysisData.pointsDistribution
    },
    goals() {
      return this.pointsDistribution[0].goals
    },
    totalPoints() {
      return this.pointsDistribution.reduce((sum, item) => {
        return sum + 
          item.goals.reduce((goalSum, goal) => {
            return goalSum + parseInt(goal.points)
          }, 0)
      }, 0)
    },
  },
  methods: {
    getIndicatorGoalsPercentage(indicator) {
      console.log(this.totalPoints)
      const goals = this.pointsDistribution.find(item => item.indicator === indicator).goals
      return goals.map(goal => ({
        ...goal,
        value: ((goal.points / this.totalPoints) * 100).toFixed(2)
      }))
    }
  }
}
</script>

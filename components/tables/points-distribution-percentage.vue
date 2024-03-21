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
import { getDistributionPercentageByIndicator } from '~/assets/utils/analysis-data'

export default {
  name: 'PoalsDistributionPercentage',
  computed: {
    ...mapState('formData', ['analysisData']),
    indicatorsConfig() {
      const index = formSteps.stepNumber['indicators']
      return formSteps.steps[index]
    },
    pointsDistribution() {
      return this.analysisData?.pointsDistribution
    },
    goals() {
      return this.pointsDistribution?.[0].goals
    }
  },
  methods: {
    getIndicatorGoalsPercentage(indicator) {
      return this.pointsDistribution
        ? getDistributionPercentageByIndicator(this.pointsDistribution, indicator)
        : []
    }
  }
}
</script>

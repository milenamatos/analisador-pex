<template>
  <cv-data-table 
    class="table"
    title="Pontuação BSC"
    helperText="A tabela abaixo apresenta a pontuação calculada com base nos indicadores selecionados, categorizados nos quadrantes do BSC, em relação aos Objetivos de Desenvolvimento Sustentável, categorizados de acordo com os pilares do TBL"
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
          v-for="goal in getIndicatorGoals(item.title)"
          :key="goal.goal"
        >
          {{ goal.points }}
        </cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script>
import { mapState } from 'vuex'
import formSteps from '~/assets/form-steps.json'

export default {
  name: 'PoalsDistribution',
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
    getIndicatorGoals(indicator) {
      return this.pointsDistribution?.find(item => item.indicator === indicator).goals
    }
  }
}
</script>

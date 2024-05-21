<template>
  <cv-data-table 
    class="table"
    title="Detalhamento dos ODS relacionados com cada indicador"
    helperText="A tabela abaixo apresenta todos os ODS relacionados com os indicadores de extensão, diretamente ou indiretamente. Para ver o nome de ODS, passe o mouse sobre o ID desejado"
  >
    <template v-slot:headings>
      <cv-data-table-heading heading="Indicador" name="name" />
      <cv-data-table-heading heading="ODS diretamente relacionados" name="direct" />
      <cv-data-table-heading heading="ODS indiretamente relacionados" name="indirect" />
    </template>

    <template v-slot:data>
      <cv-data-table-row 
        v-for="(item, index) in relatedGoals" 
        :key="index" 
        :value="index.toString()"
      >
        <cv-data-table-cell :style="getRowStyle(indicatorList[item.indicator_id])">
          {{ indicatorList[item.indicator_id].formattedName }}
        </cv-data-table-cell>
        
        <cv-data-table-cell>
          <cv-tooltip 
            v-for="goalId in item.direct" 
            :key="goalId"
            :tip="goals[goalId].name"
            direction="bottom"
            class="tooltip"
          >
            <cv-tag 
              :label="goalId.toString()"
              :filter="filter"
              @remove="$emit('remove', { index, goalId, type: 'direct' })">
            </cv-tag>
          </cv-tooltip>
        </cv-data-table-cell>
        
        <cv-data-table-cell>
          <cv-tooltip 
            v-for="goalId in item.indirect" 
            :key="goalId"
            :tip="goals[goalId].name"
            direction="bottom"
            class="tooltip"
          >
            <cv-tag 
              :label="goalId.toString()"
              :filter="filter"
              @remove="$emit('remove', { index, goalId, type: 'indirect' })">
            </cv-tag>
          </cv-tooltip>
        </cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import formSteps from '~/assets/form-steps.json'

export default {
  name: 'RelatedGoals',
  props: {
    filter: {
      type: Boolean,
      default: false
    },
    relatedGoalsList: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    ...mapGetters('indicator', ['indicatorList']),
    ...mapState('goal', ['goals']),
    ...mapState('formData', ['analysisData']),
    relatedGoals() {
      return this.relatedGoalsList || this.analysisData.relatedGoals
    }
  },
  methods: {
    getRowStyle(indicator) {
      const index = formSteps.stepNumber['indicators']
      const indicatorsConfig = formSteps.steps[index]
      const currentIndicator = indicatorsConfig.find(item => item.dataLabel === indicator.Category.label)
      
      return currentIndicator.style
    },
  }
}
</script>

<style>
.bx--data-table-content {
  overflow-x: unset !important;
}
</style>
<template>
  <cv-data-table 
    class="table"
    title="Distribuição dos ODS"
    helperText="A tabela abaixo apresenta a quantidade de relacionamentos de cada Objetivo, de forma direta e indireta"
  >
    <template v-slot:headings>
      <cv-data-table-heading heading="Lista de ODS" name="" />

      <cv-data-table-heading 
        v-for="item in goals"
        :key="item.id"
        :heading="`ODS ${item.id}`"
        :name="item.id"
      />
    </template>

    <template v-slot:data>
      <cv-data-table-row>
        <cv-data-table-cell>
          Direto
        </cv-data-table-cell>

        <cv-data-table-cell
          v-for="(item, index) in formattedGoalsDistribution"
          :key="index"
        >
          {{ item.direct }}
        </cv-data-table-cell>
      </cv-data-table-row>

      <cv-data-table-row>
        <cv-data-table-cell>
          Indireto
        </cv-data-table-cell>

        <cv-data-table-cell
          v-for="(item, index) in formattedGoalsDistribution"
          :key="index"
        >
          {{ item.indirect }}
        </cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script>
import { mapState } from 'vuex'
import { getGoalDistribution } from '~/assets/utils/analysis-data'

export default {
  name: 'GoalsDistribution',
  computed: {
    ...mapState('goal', ['goals']),
    ...mapState('formData', ['analysisData']),
    formattedGoalsDistribution() {
      const data = this.analysisData.goalsDistribution
      return Object.keys(this.goals).map(goalId => ({
        direct: getGoalDistribution(data, goalId, 'direct'),
        indirect: getGoalDistribution(data, goalId, 'indirect')
      }))
    }
  }
}
</script>

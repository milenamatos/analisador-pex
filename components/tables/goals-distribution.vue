<template>
  <cv-data-table 
    class="table"
    title="Distribuição ODS"
    helperText="A tabela abaixo apresenta...."
  >
    <template v-slot:headings>
      <cv-data-table-heading heading="Lista de ODS" name="" />

      <cv-data-table-heading 
        v-for="item in goals"
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

export default {
  name: 'GoalsDistribution',
  computed: {
    ...mapState('keyword', ['goals']),
    ...mapState('formData', ['goalsDistribution']),
    formattedGoalsDistribution() {
      return Object.keys(this.goals).map(goal_id => ({
        direct: this.goalsDistribution.find(item => item.id == goal_id && item.relation === 'direct')?.count || 0,
        indirect: this.goalsDistribution.find(item => item.id == goal_id && item.relation === 'indirect')?.count || 0
      }))
    }
  }
}
</script>

<template>
  <cv-data-table class="table">
    <template v-slot:headings>
      <cv-data-table-heading heading="Indicador" name="name" sortable />
      <cv-data-table-heading heading="ODS diretamente relacionados" name="direct" />
      <cv-data-table-heading heading="ODS indiretamente relacionados" name="indirect" />
    </template>

    <template v-slot:data>
      <cv-data-table-row v-for="(item, index) in relatedGoals" :key="index" :value="index.toString()">
        <cv-data-table-cell>
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
            <cv-tag :label="goalId.toString()"></cv-tag>
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
            <cv-tag :label="goalId.toString()"></cv-tag>
          </cv-tooltip>
        </cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'RelatedGoals',
  computed: {
    ...mapGetters('indicator', ['indicatorList']),
    ...mapState('keyword', ['goals']),
    ...mapState('formData', ['relatedGoals'])
  },
}
</script>

<style>
.bx--data-table-content {
  overflow-x: unset;
}
</style>
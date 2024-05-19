<template>
  <cv-data-table 
    class="table"
    title="Lista completa dos tópicos e ODS relacionados"
    helperText="A tabela abaixo apresenta a lista de tópicos (palavras-chave) sugeridos pela ONU e seus respectivos ODS"
    zebra
  >
    <template v-slot:headings>
      <cv-data-table-heading heading="Tópico (palavra-chave)" name="name" />
      <cv-data-table-heading heading="ODS relacionados" name="ods" />
    </template>

    <template v-slot:data>
      <cv-data-table-row 
        v-for="(item, index) in keywords" 
        :key="index" 
        :value="index.toString()"
      >
        <cv-data-table-cell>
          {{ item.name }}
        </cv-data-table-cell>
        
        <cv-data-table-cell>
          <cv-tooltip 
            v-for="goal in item.goals" 
            :key="goal.id"
            :tip="goal.name"
            direction="bottom"
            class="tooltip"
          >
            <cv-tag :label="goal.id.toString()"></cv-tag>
          </cv-tooltip>
        </cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RelatedGoals',
  computed: {
    ...mapState('keyword', ['keywords']),
    relatedGoals() {
      return this.analysisData.relatedGoals
    }
  }
}
</script>

<style>
.bx--data-table-content {
  overflow-x: unset !important;
}
</style>
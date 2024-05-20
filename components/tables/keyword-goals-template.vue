<template>
  <cv-data-table 
    class="table"
    :title="title"
    :helperText="helperText"
    zebra
  >
    <template v-slot:headings>
      <cv-data-table-heading heading="Tópico (palavra-chave)" name="name" />
      <cv-data-table-heading heading="ODS relacionados" name="ods" />
    </template>

    <template v-slot:data>
      <cv-data-table-row 
        v-for="(item, index) in keywordList" 
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
export default {
  name: 'KeywordGoalsTemplate',
  props: {
    title: {
      type: String,
      required: true
    },
    helperText: {
      type: String,
      required: true
    },
    keywordList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.bx--data-table-content {
  overflow-x: unset !important;
}
</style>
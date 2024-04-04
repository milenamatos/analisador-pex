<template>
  <cv-data-table 
    class="table"
    title="Objetivos de Desenvolvimento Sustentável"
    helperText="A tabela abaixo apresenta a lista dos Objetivos de Desenvolvimento Sustentável"
  >
    <template v-slot:headings>
      <cv-data-table-heading heading="ID" name="" />
      <cv-data-table-heading heading="Nome" name="" />
      <cv-data-table-heading heading="Categoria" name="" />
    </template>

    <template v-slot:data>
      <cv-data-table-row 
        v-for="id in goalIds"
        :key="id"
      >
        <cv-data-table-cell>
          {{ id }}
        </cv-data-table-cell>

        <cv-data-table-cell>
          {{ goals[id].name }}
        </cv-data-table-cell>

        <cv-data-table-cell>
          {{ goals[id].Category.title }}
        </cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Goals',
  computed: {
    ...mapState('goal', ['goals']),
    goalIds() {
      return Object.keys(this.goals)
    },
  }
}
</script>

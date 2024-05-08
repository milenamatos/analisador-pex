<template>
  <div class="ibeu">
    <h1>IBEU - Indicadores Brasileiros de Extensão Universitária</h1>
    <p>
      Abaixo está a tabela contendo informações sobre todos os 52 indicadores conforme definidos pelo FORPROEX <cv-link href="https://docs.wixstatic.com/ugd/ff2fac_3bdef56a32ce47b18c83a6d911669596.pdf" target="_blank">neste relatório de pesquisa.</cv-link>
    </p>

    <cv-data-table class="table" zebra @search="onFilter" searchLabel="Pesquisar" searchPlaceholder="Pesquisar pelo código ou nome">
      <template v-slot:headings>
        <cv-data-table-heading heading="Código e Nome " name="" />
        <cv-data-table-heading heading="Objetivo" name="" />
        <cv-data-table-heading heading="Fórmula de cálculo" name="" />
      </template>

      <template v-slot:data>
        <cv-data-table-row v-for="indicator in filteredIndicators" :key="indicator.id">
          <cv-data-table-cell>
            {{ `${indicator.name} - ${indicator.description}` }}
          </cv-data-table-cell>

          <cv-data-table-cell>
            {{ indicator.objective }}
          </cv-data-table-cell>

          <cv-data-table-cell>
            {{ indicator.formula }}
          </cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'IbeuPage',
  data() {
    return {
      filteredIndicators: []
    }
  },
  computed: {
    ...mapState('indicator', ['indicators']),
  },
  async beforeMount() {
    if (!this.indicators.length) {
      await this.getIndicators()
    }

    this.filteredIndicators = this.indicators
  },
  methods: {
    ...mapActions('indicator', ['getIndicators']),
    onFilter(input) {
      this.filteredIndicators = this.indicators.filter(indicator => {
        return indicator.name.toLowerCase().includes(input.toLowerCase())
          || indicator.description.toLowerCase().includes(input.toLowerCase())
      })
    }
  }
}
</script>

<style lang="scss">
.ibeu {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
  width: 90%;
}
</style>
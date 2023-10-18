<template>
  <cv-data-table 
    class="table"
    title="Distribuição Indicadores de Extensão Universitária"
    helperText="A tabela abaixo apresenta...."
  >
    <template v-slot:headings>
      <cv-data-table-heading heading="Indicador" name="name" />
      <cv-data-table-heading heading="Quantidade" name="quantity" />
      <cv-data-table-heading heading="%" name="percentage" />
    </template>

    <template v-slot:data>
      <cv-data-table-row 
        v-for="(item, index) in indicatorCategories" 
        :key="index" 
        :value="index.toString()"
      >
        <cv-data-table-cell :style="item.style">
          {{ item.name }}
        </cv-data-table-cell>
        
        <cv-data-table-cell>
          {{ groupedIndicators[item.category] || 0 }}
        </cv-data-table-cell>
        
        <cv-data-table-cell>
          {{ `${getPercentage(item.category)}%`}}
        </cv-data-table-cell>
      </cv-data-table-row>

      <cv-data-table-row>
        <cv-data-table-cell>
          Total
        </cv-data-table-cell>
        
        <cv-data-table-cell>
          {{ totalIndicators }}
        </cv-data-table-cell>
        
        <cv-data-table-cell>
          100%
        </cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
import formSteps from '~/assets/form-steps.json'

export default {
  name: 'IndicatorsDistribution',
  computed: {
    ...mapGetters('formData', ['formattedData', 'groupedIndicators']),
    indicatorCategories() {
      const index = formSteps.stepNumber['indicators']
      const indicatorsConfig = formSteps.steps[index]
      
      return indicatorsConfig.map(item => ({
        name: item.title,
        category: item.dataLabel,
        style: item.style
      }))
    },
    totalIndicators() {
      return this.formattedData.indicators.length
    }
  },
  methods: {
    getPercentage(category) {
      const value = (this.groupedIndicators[category] / this.totalIndicators) * 100
      return this.groupedIndicators[category] ? value.toFixed(2) : 0
    }
  }
}
</script>

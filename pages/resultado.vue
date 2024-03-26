<template>
  <div class="result-container">
    <div class="navigation">
      <cv-button kind="tertiary" @click="$router.push('/analisar-projeto')">
        Realizar outra análise
      </cv-button>

      <cv-content-switcher class="content-switcher" aria-label='Escolha uma opção'>
        <cv-content-switcher-button owner-id="relatorio" :selected="selectedIndex === 0">
          Relatório
        </cv-content-switcher-button>
        <cv-content-switcher-button owner-id="tabelas" :selected="selectedIndex === 1">
          Tabelas
        </cv-content-switcher-button>
      </cv-content-switcher>

      <cv-button :icon="exportIcon" @click="exportToPDF">
        Exportar
      </cv-button>
    </div>

    <section style="margin: 10px 0;" ref="pdf-content">
      <cv-content-switcher-content owner-id="relatorio">
        <h3>Resultado da análise</h3>

        <FormReview 
          :filter="false" 
          label="formattedName"
          class="review"
        />

        <cv-grid fullWidth class="resultado">
          <cv-row v-for="chart in charts" :key="chart">
            <cv-column>
              <component :is="chart" />
            </cv-column>
          </cv-row>
        </cv-grid>
      </cv-content-switcher-content>

      <cv-content-switcher-content owner-id="tabelas">
        <h3>Tabelas informativas</h3>

        <cv-grid fullWidth class="resultado">
          <cv-row v-for="table in tables" :key="table">
            <cv-column>
              <component :is="table" />
            </cv-column>
          </cv-row>
        </cv-grid>
      </cv-content-switcher-content>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import html2pdf from 'html2pdf.js'

import FormReview from "~/components/form-review"

import RelatedGoals from '~/components/tables/related-goals'
import IndicatorsDistributionTable from '~/components/tables/indicators-distribution'
import IndicatorsDistributionChart from '~/components/charts/indicators-distribution'
import IndicatorsDistributionBSCChart from '~/components/charts/indicators-distribution-bsc'
import IndicatorsDistributionTBLChart from '~/components/charts/indicators-distribution-tbl'
import GoalsDistributionTable from '~/components/tables/goals-distribution'
import GoalsDistributionChart from '~/components/charts/goals-distribution'
import PointsDistributionTable from '~/components/tables/points-distribution'
import PointsDistributionPercentageTable from '~/components/tables/points-distribution-percentage'

export default {
  name: 'ResultadoPage',
  components: {
    FormReview,
    RelatedGoals,
    IndicatorsDistributionTable,
    IndicatorsDistributionChart,
    IndicatorsDistributionBSCChart,
    IndicatorsDistributionTBLChart,
    GoalsDistributionTable,
    GoalsDistributionChart,
    PointsDistributionTable,
    PointsDistributionPercentageTable
  },
  data() {
    return {
      exportIcon: require('~/assets/icons/generate-pdf.svg'),
      selectedIndex: 0,
      charts: [
        'RelatedGoals',
        'IndicatorsDistributionChart',
        'PointsDistributionTable',
        'GoalsDistributionChart',
        'IndicatorsDistributionBSCChart',
        'IndicatorsDistributionTBLChart'
      ],
      tables: [
        'IndicatorsDistributionTable',
        'GoalsDistributionTable',
        'PointsDistributionPercentageTable'
      ]
    }
  },
  beforeMount() {
    if (!this.requestedAnalysis)
      this.$router.push('/analisar-projeto')
  },
  computed: {
    ...mapState('formData', ['requestedAnalysis']),
  },
  methods: {
    exportToPDF() {
      const element = this.$refs["pdf-content"]
      const opt = {
        margin: 0.5,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, width: 1500, 
          ignoreElements: element => element.className == "bx--assistive-text"
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
      }

      html2pdf().set(opt).from(element).save();
    }
  }
}
</script>

<style lang="scss">
@import "../styles/carbon";

.result-container {
  width: 80%;
}

.navigation {
  align-items: center;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}

.content-switcher {
  width: 40%;
}

.bx--content-switcher--selected,
.bx--content-switcher-btn::after {
  background-color: blue !important;
}

.review {
  text-align: left;
}

.resultado {
  display: grid;
  grid-gap: 70px;
  margin-top: 40px;
  padding: 0;
  width: 100%;
}
</style>

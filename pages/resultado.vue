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

    <cv-loading :active="isLoading" overlay></cv-loading>

    <cv-content-switcher-content owner-id="relatorio">
      <section ref="pdf-content">
        <h3 class="title">Resultado da análise</h3>

        <h4 class="left-align title">
          Análise realizada em {{ date }} às {{ time }}, através do site {{ host }}
        </h4>

        <FormReview :filter="false" label="formattedName" class="left-align" />

        <cv-grid fullWidth class="resultado">
          <cv-row v-for="chart in charts" :key="chart">
            <cv-column>
              <component :is="chart" />
            </cv-column>
          </cv-row>
        </cv-grid>

        <cv-grid 
          v-show="showReferenceTables"
          fullWidth 
          class="resultado"
        >
          <h3 class="title">Referências e Tabelas informativas</h3>

          <cv-row v-for="table in tables" :key="table">
            <cv-column>
              <component :is="table" />
            </cv-column>
          </cv-row>
        </cv-grid>
      </section>
    </cv-content-switcher-content>

    <cv-content-switcher-content owner-id="tabelas">
      <h3 class="title">Tabelas informativas</h3>

      <cv-grid fullWidth class="resultado">
        <cv-row v-for="table in tables" :key="table">
          <cv-column>
            <component :is="table" />
          </cv-column>
        </cv-row>
      </cv-grid>
    </cv-content-switcher-content>

  </div>
</template>

<script>
import { mapState } from 'vuex'
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

import GoalsTable from '~/components/tables/goals'

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
    PointsDistributionPercentageTable,
    GoalsTable
  },
  data() {
    return {
      createdAt: null,
      exportIcon: require('~/assets/icons/generate-pdf.svg'),
      isLoading: false,
      selectedIndex: 0,
      showReferenceTables: false,
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
        'PointsDistributionPercentageTable',
        'GoalsTable'
      ]
    }
  },
  beforeMount() {
    if (!this.requestedAnalysis)
      this.$router.push('/analisar-projeto')
  },
  created() {
    this.createdAt = new Date()
  },
  computed: {
    ...mapState('formData', ['requestedAnalysis']),
    date() {
      return this.createdAt.toLocaleDateString()
    },
    time() {
      return this.createdAt.toLocaleTimeString()
    },
    host() {
      return window.location.host
    }
  },
  methods: {
    exportToPDF() {
      this.isLoading = true;
      this.showReferenceTables = true;

      setTimeout(() => {
        const width = (document.documentElement.clientWidth * 0.9)
        const element = this.$refs["pdf-content"]
        const opt = {
          margin: 0.5,
          filename: `relatorio_analisador_pex_${this.date}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2, width,
            ignoreElements: element => element.className == "bx--assistive-text"
          },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
          pageBreak: { mode: 'avoid-all' }
        }

        html2pdf().set(opt).from(element).save();

        this.isLoading = false;
        this.showReferenceTables = false;
      }, 500)
    }
  }
}
</script>

<style lang="scss">
@import "../styles/carbon";

.result-container {
  width: 90%;
}

.navigation {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  row-gap: 16px;
  
  @media screen and (min-width: 1200px) {  
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
}

.content-switcher {
  width: 100%;

  @media screen and (min-width: 1200px) {  
    width: 40%;
  }
}

.bx--content-switcher--selected,
.bx--content-switcher-btn::after {
  background-color: blue !important;
}

.left-align {
  text-align: left;
}

.resultado {
  display: grid;
  grid-gap: 70px;
  margin-top: 40px;
  padding: 0;
  width: 100%;
}

.title {
  margin-top: 40px;
}
</style>

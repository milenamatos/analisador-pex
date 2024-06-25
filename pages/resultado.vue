<template>
  <div class="result-container">
    <div class="navigation">
      <cv-button kind="tertiary" @click="$router.push('/analisar-projeto')">
        Realizar outra análise
      </cv-button>

      <cv-content-switcher class="content-switcher" aria-label='Escolha uma opção' @selected="onSelected">
        <cv-content-switcher-button owner-id="relatorio" :selected="selectedIndex === 0">
          Relatório
        </cv-content-switcher-button>
        <cv-content-switcher-button owner-id="tabelas" :selected="selectedIndex === 1">
          Tabelas
        </cv-content-switcher-button>
      </cv-content-switcher>

      <cv-button 
        :disabled="selectedIndex === 1"
        :icon="exportIcon" 
        @click="exportToPDF"
      >
        Exportar
      </cv-button>
    </div>

    <cv-loading :active="isLoading" overlay></cv-loading>

    <cv-content-switcher-content owner-id="relatorio">
      <section ref="pdf-content">
        <cv-grid fullWidth class="result">
          <h1>Analisador de Projetos de Extensão</h1>

          <p class="left-align">
            A análise apresentada neste relatório foi realizada em {{ date }} às {{ time }}, através do site <cv-link :href="host" target="_blank">{{ host }}</cv-link>
          </p>

          <cv-tile fullWidth class="details text-justify">
            <h4>Sobre a ferramenta:</h4> 
            
            <p>
              O objetivo do Analisador PEX (Projetos de Extensão) é auxiliar na visualização de informações úteis para a autoavaliação dos projetos de extensão universitária. Para isto, a ferramenta realiza uma série de análises utilizando os ODS (Objetivos de Desenvolvimento Sustentável) e os IBEU (Indicadores Brasileiros de Extensão Universitária), criando uma maneira alternativa de se avaliar os projetos. 
            </p>
          </cv-tile>

          <cv-tile fullWidth class="details text-justify">
            <h4>Resumo da metodologia:</h4> 

            <p>
              A metodologia utiliza métodos de gestão estratégica e sustentável estruturados pelo modelo <em>Balanced Scorecard</em> (BSC) aliado ao modelo <em>Triple Bottom Line (TBL)</em>. O mapa estratégico sobre a extensão universitária desenvolvido pelo <cv-link href="https://docs.wixstatic.com/ugd/ff2fac_3bdef56a32ce47b18c83a6d911669596.pdf" target="_blank">FORPROEX</cv-link> incorporou a metodologia empregada pelo modelo BSC utilizando os 52 indicadores de avaliação da Extensão Universitária e adaptando os quatro quadrantes tradicionais do modelo BSC para quadrantes que representam as seguintes perspectivas: <strong>Do Aluno, da Sociedade e dos Financiadores Públicos; Dos Processos Internos; Da Aprendizagem e Crescimento; Dos Recursos Financeiros e Infraestrutura </strong>. Adicionalmente, a autora da dissertação na qual esta ferramenta se baseia, distribuiu os ODS nos pilares definidos pelo TRBL, são eles: <strong>Sociocultural, Meio Ambiente e Econômico.</strong>
            </p>
            <p> Para mais detalhes sobre a metodologia utilizada, visite esta página: <cv-link :href="`${host}/metodologia`" target="_blank"> {{ `${host}/metodologia` }} </cv-link></p>
          </cv-tile>

          <cv-tile fullWidth class="left-align">
            <FormReview :filter="false" label="formattedName" class="left-align" />
          </cv-tile>

          <h3 class="title">Resultado da análise</h3>

          <cv-row v-for="chart in charts" :key="chart">
            <cv-column>
              <component :is="chart" />
            </cv-column>
          </cv-row>
        
          <section 
            v-show="showReferenceTables"
            fullWidth 
            class="result"
          >
            <h3 class="title">Referências e Tabelas informativas</h3>

            <cv-row v-for="table in tables" :key="table">
              <cv-column>
                <component :is="table" />
              </cv-column>
            </cv-row>
          </section>
        </cv-grid>
      </section>
    </cv-content-switcher-content>

    <cv-content-switcher-content owner-id="tabelas">
      <h3 class="title">Tabelas informativas</h3>

      <cv-grid fullWidth class="result">
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

import GoalsDistributionViaKeywordsChart from '~/components/charts/goals-distribution-via-keywords'
import IndicatorsDistributionChart from '~/components/charts/indicators-distribution'
import IndicatorsDistributionBSCChart from '~/components/charts/indicators-distribution-bsc'
import IndicatorsDistributionTBLChart from '~/components/charts/indicators-distribution-tbl'
import GoalsDistributionChart from '~/components/charts/goals-distribution'

import SelectedKeywordGoalsTable from '~/components/tables/keyword-goals'
import RelatedGoals from '~/components/tables/related-goals'
import IndicatorsDistributionTable from '~/components/tables/indicators-distribution'
import GoalsDistributionTable from '~/components/tables/goals-distribution'
import PointsDistributionTable from '~/components/tables/points-distribution'
import PointsDistributionPercentageTable from '~/components/tables/points-distribution-percentage'
import GoalsTable from '~/components/tables/goals'
import FullKeywordGoalsTable from '~/components/tables/keyword-goals-full'

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
    GoalsTable,
    FullKeywordGoalsTable,
    SelectedKeywordGoalsTable,
    GoalsDistributionViaKeywordsChart
  },
  data() {
    return {
      createdAt: null,
      exportIcon: require('~/assets/icons/generate-pdf.svg'),
      isLoading: false,
      selectedIndex: 0,
      showReferenceTables: false,
      charts: [
        'SelectedKeywordGoalsTable',
        'GoalsDistributionViaKeywordsChart',
        'IndicatorsDistributionChart',
        'IndicatorsDistributionBSCChart',
        'IndicatorsDistributionTBLChart',
        'RelatedGoals',
        'GoalsDistributionChart',
        'PointsDistributionTable'
      ],
      tables: [
        'IndicatorsDistributionTable',
        'GoalsDistributionTable',
        'PointsDistributionPercentageTable',
        'GoalsTable',
        'FullKeywordGoalsTable'
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
    onSelected(tab) {
      this.selectedIndex = (tab === 'relatorio') ? 0 : 1
    },
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
          pageBreak: { mode: ['avoid-all'] },
          enableLinks: true
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

.text-justify {
  text-align: justify;
}

.details {
  display: grid;
  row-gap: 16px;
  width: 100%;
}

.result {
  display: grid;
  grid-gap: 36px;
  margin-top: 40px;
  padding: 0;
  width: 100%;
}

.title {
  margin-top: 40px;
}
</style>

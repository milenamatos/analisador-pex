<template>
  <div class="result-container">
    <div class="navigation">
      <cv-button kind="tertiary" @click="$router.push('/avaliar-projeto')">
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

      <cv-button :icon="exportIcon" @click="">
        Exportar
      </cv-button>
    </div>

    <section style="margin: 10px 0;">
      
      <cv-content-switcher-content owner-id="relatorio">
        <h3>Relatório de análise</h3>
        <cv-grid fullWidth class="resultado">
          <cv-row>
            <cv-column>
              <RelatedGoals />
            </cv-column>
          </cv-row>
          
          <cv-row>
            <cv-column>
              <IndicatorsDistributionChart />
            </cv-column>
          </cv-row>

          <cv-row>
            <cv-column>
              <PointsDistributionTable />
            </cv-column>
          </cv-row>

          <cv-row>
            <cv-column>
              <GoalsDistributionChart />
            </cv-column>
          </cv-row>
        </cv-grid>
      </cv-content-switcher-content>

      <cv-content-switcher-content owner-id="tabelas">
        <h3>Tabelas</h3>

        <cv-grid fullWidth class="resultado">
          <cv-row>
            <cv-column>
              <IndicatorsDistributionTable/>
            </cv-column>
          </cv-row>

          <cv-row>
            <cv-column>
              <GoalsDistributionTable />
            </cv-column>
          </cv-row>
        </cv-grid>
      </cv-content-switcher-content>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RelatedGoals from '~/components/tables/related-goals'
import IndicatorsDistributionTable from '~/components/tables/indicators-distribution'
import IndicatorsDistributionChart from '~/components/charts/indicators-distribution'
import GoalsDistributionTable from '~/components/tables/goals-distribution'
import GoalsDistributionChart from '~/components/charts/goals-distribution'
import PointsDistributionTable from '~/components/tables/points-distribution'

export default {
  name: 'ResultadoPage',
  components: {
    RelatedGoals,
    IndicatorsDistributionTable,
    IndicatorsDistributionChart,
    GoalsDistributionTable,
    GoalsDistributionChart,
    PointsDistributionTable
  },
  data() {
    return {
      exportIcon: require('~/assets/icons/generate-pdf.svg'),
      selectedIndex: 0
    }
  },
  created() {
    if (!this.requestedAnalysis)
      this.$router.push('/avaliar-projeto')
  },
  computed: {
    ...mapState('formData', ['requestedAnalysis']),
  },
  methods: {
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

.bx--content-switcher--selected, .bx--content-switcher-btn::after {
  background-color: blue !important;
}

.resultado {
  display: grid;
  grid-gap: 70px;
  margin-top: 40px;
  padding: 0;
  width: 100%;
}
</style>

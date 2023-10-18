<template>
  <div>
    <div class="navigation">
      <cv-button kind="tertiary" @click="$router.push('/avaliar-projeto')">
        Realizar outra análise
      </cv-button>
      <cv-button :icon="exportIcon" @click="">
        Exportar
      </cv-button>
    </div>

    <h3>Relatório de análise</h3>

    <cv-grid fullWidth class="resultado">
      <cv-row>
        <cv-column>
          <RelatedGoals />
        </cv-column>
      </cv-row>

      <cv-row>
        <cv-column>
          <IndicatorsDistribution />
        </cv-column>
        <cv-column>
          <div>bbbbb</div>
        </cv-column>
      </cv-row>
    </cv-grid>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import RelatedGoals from '~/components/related-goals'
import IndicatorsDistribution from '~/components/indicators-distribution'

export default {
  name: 'ResultadoPage',
  components: {
    RelatedGoals,
    IndicatorsDistribution
  },
  data() {
    return {
      exportIcon: require('~/assets/icons/generate-pdf.svg'),
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

.navigation {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}

.resultado {
  display: grid;
  grid-gap: 70px;
  margin-top: 40px;
}

// .resultado-tabela {
//   grid-column: span 2;
// }

.cv-grid {
  padding: 0;
}
</style>

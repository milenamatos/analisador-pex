<template>
  <div>
    <h3>Resultado</h3>

    <div class="navigation">
      <cv-button kind="tertiary" @click="">
        Realizar outra análise
      </cv-button>
      <cv-button :icon="exportIcon" @click="">
        Exportar
      </cv-button>
    </div>

    <div class="resultado">
      <cv-grid fullWidth>
        <cv-row>
          <cv-column>
            <RelatedGoals />
          </cv-column>
        </cv-row>

        <cv-row>
          <cv-column>
            <div>aaaa</div>
          </cv-column>
          <cv-column>
            <div>bbbbb</div>
          </cv-column>
        </cv-row>

      </cv-grid>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RelatedGoals from '~/components/related-goals'

export default {
  name: 'ResultadoPage',
  components: {
    RelatedGoals
  },
  data() {
    return {
      exportIcon: require('~/assets/icons/generate-pdf.svg'),
    }
  },
  computed: {
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
  // display: grid;
  // grid-template-rows: 1fr 1fr;
  // grid-template-columns: 1fr 1fr;
  // grid-gap: 20px;
  margin-top: 40px;
}

// .resultado-tabela {
//   grid-column: span 2;
// }

.cv-grid {
  padding: 0;
}
</style>

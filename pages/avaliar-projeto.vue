<template>
  <div class="avaliar-projeto">
    <h3 class="align-center">Analise seu projeto de acordo com os indicadores FORPROEX e Objetivos de Desenvolvimento Sustentável!</h3>

    <p class="align-center">Preencha as informações no formulário abaixo para realizar sua avaliação. Seus dados não serão salvos nem
      compartilhados.</p>

    <cv-progress class="stepper" :initial-step="currentStepNumber" :steps="stepNames" />

    <div class="form-content">
      <div 
        v-for="(step, stepIndex) in filledSteps" 
        v-show="stepIndex === currentStepNumber"
        :key="stepIndex"
        class="form"
      >  
        <component 
          v-for="(field, index) in step" 
          :is="field.name" 
          :key="index" 
          :value="formData[field.dataLabel]"
          v-bind="field" 
          @input="($event) => {
            if (field.name == 'cv-text-input') {
              setFormData({ ...formData, [field.dataLabel]: $event })
            }
          }" 
          @change="($event) => {
            if (field.name == 'cv-text-area') {
              setFormData({ ...formData, [field.dataLabel]: $event.target.value })
            }
            else if (field.name == 'cv-multi-select') {
              setFormData({ ...formData, [field.dataLabel]: $event })
            }
          }" 
        />
      </div>

      <p v-if="isFirstStep">* Campo obrigatório</p>
      <p v-else-if="!isLastStep">OBS: Selecione pelo menos 1 item de alguma das categorias</p>

      <div :class='["form-navigation", {
          "form-navigation-first-step": isFirstStep
        }]'>
        <cv-button 
          v-if="currentStepNumber > 0" 
          :disabled="isLoading"
          kind="tertiary" 
          @click="previousButton"
        >
          Voltar
        </cv-button>
        
        <cv-button :icon="nextButtonIcon" :disabled="isLoading" @click="nextButton">
          {{ nextButtonLabel }}
        </cv-button>
      </div>

      <div v-if="showToast" class="toast">
        <cv-toast-notification
          kind="warning"
          title="Não é possível prosseguir"
          caption="Preencha os campos necessários no formulário para continuar"
          @close="showToast = false"
          lowContrast>
        </cv-toast-notification>
      </div>
    </div>

    <cv-loading :active="isLoading" overlay></cv-loading>
  </div>
</template>

<script>
import formSteps from '~/assets/form-steps.json'
import FormReview from "~/components/form-review"
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AvaliarProjetoPage',
  components: {
    "form-review": FormReview,
  },
  data() {
    return {
      chevronRightIcon: require('~/assets/icons/chevron-right.svg'),
      playIcon: require('~/assets/icons/play.svg'),
      currentStepNumber: 0,
      filledSteps: [],
      stepNames: formSteps.stepNames,
      isLoading: false,
      showToast: false
    }
  },
  computed: {
    ...mapGetters('goal', ['goals']),
    ...mapGetters('keyword', ['keywords']),
    ...mapGetters('indicator', ['indicators']),
    ...mapGetters('formData', ['formData']),
    currentStep() {
      return this.filledSteps[this.currentStepNumber]
    },
    isFirstStep() {
      return this.currentStepNumber === 0
    },
    isLastStep() {
      return this.currentStepNumber === formSteps.steps.length - 1
    },
    nextButtonIcon() {
      return this.isLastStep
        ? this.playIcon
        : this.chevronRightIcon
    },
    nextButtonLabel() {
      return this.isLastStep
        ? "Realizar Análise"
        : "Próximo"
    }
  },
  async beforeMount() {
    await this.getKeywords();
    await this.getIndicators();  
    await this.getGoals();

    this.filledSteps = formSteps.steps.map(step => {
      return step.map(field => ({
        ...field,
        options: field.model ? 
          this.mapOptions(
            this[field.model](field.dataLabel)
          ) : []
      }))
    })

  },
  methods: {
    ...mapActions('goal', ['getGoals']),
    ...mapActions('keyword', ['getKeywords']),
    ...mapActions('indicator', ['getIndicators']),
    ...mapActions('formData', ['setFormData', 'fetchAnalysis']),
    mapOptions(optionsList) {
      return optionsList.map((item) => ({
        name: item.name,
        label: item.name,
        value: item.id.toString()
      }))
    },
    validateForm() {
      return this.currentStepNumber == 0
        ? this.currentStep.every((item) => !!this.formData[item.dataLabel] || !!item.optional)
        : this.currentStep.some((item) => this.formData[item.dataLabel]?.length)
    },
    previousButton() {
      setTimeout(() => {
        this.currentStepNumber--
      }, 100)
    },
    async nextButton() {
      if (this.isLastStep) {
        this.isLoading = true
        await this.fetchAnalysis()
        
        this.$router.push('/resultado')
      } else {
        if (this.validateForm()) {
          this.showToast = false
          this.currentStepNumber++
        } else {
          this.showToast = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../styles/carbon";

.avaliar-projeto {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 16px;
  text-align: start;
  width: 90%;
}

.align-center {
  text-align: center;
}

.stepper {
  justify-content: center;
  margin-top: 32px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form {
  display: grid;
  gap: 40px;
}

.form-navigation {
  display: flex;
  justify-content: space-between;
}

.form-navigation-first-step {
  display: grid;
  justify-content: flex-end;
  justify-items: flex-end;
}

.bx--progress-step,
.bx--progress-line {
  width: -webkit-fill-available;
}

.bx--progress-label {
  max-width: 22rem !important;
}

.bx--label {
  color: inherit;
}

.toast {
  align-self: flex-end;
  bottom: 150px;
  position: relative;
  right: 130px;
  z-index: 2;
}
</style>

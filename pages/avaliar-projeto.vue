<template>
  <div class="avaliar-projeto">
    <h3>Avalie seu projeto de acordo com os indicadores FORPROEX e Objetivos de Desenvolvimento Sustentável!</h3>

    <p>Preencha as informações no formulário abaixo para realizar sua avaliação. Seus dados não serão salvos nem
      compartilhados.</p>

    <cv-progress class="stepper" :initial-step="currentStepNumber" :steps="steps" />

    <div class="form">
      <component 
        v-for="(item, index) in currentStep" 
        :is="item.name" 
        :key="index"
        v-bind="item" 
        v-model="formData[item.id]"
      />

      <div :class='["form-navigation", {
          "form-navigation-first-step": currentStepNumber == 0
        }]'>
        <cv-button 
          v-if="currentStepNumber > 0" 
          :disabled="isLoading"
          kind="tertiary" 
          @click="currentStepNumber--"
        >
          Voltar
        </cv-button>
        <cv-button :icon="nextButtonIcon" :disabled="isLoading" @click="nextButton">
          {{ nextButtonLabel }}
        </cv-button>
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
      currentStep: {},
      currentStepNumber: 0,
      steps: formSteps.stepNames,
      isLoading: false,
      formData: {}
    }
  },
  computed: {
    ...mapGetters('keyword', ['keywordsByCategory']),
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
        ? "Realizar Avaliação"
        : "Próximo"
    }
  },
  watch: {
    currentStepNumber: {
      immediate: true,
      async handler(newValue) {
        const newSteps = formSteps.steps[newValue]
        
        switch(newValue) {
          case 1:
            await this.getKeywords();
            this.currentStep = newSteps.map(field => ({
              ...field, options: this.getKeywordsByCategory(field.dataLabel)
            }))
            break;
          default:
            this.currentStep = newSteps
        }
      }
    }
  },
  methods: {
    ...mapActions('keyword', ['getKeywords']),
    getKeywordsByCategory(category) {
      this.keywordsByCategory(category).map((keyword) => ({
        name: keyword.name,
        label: keyword.name,
        value: keyword.id.toString()
      }))
    },
    validateForm() {
      return this.currentStep.every((item) => !!this.formData[item.id])
    },
    nextButton() {
      if (this.isLastStep) {
        // this.startEvaluation()
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
        }, 3000)
      } else {
        if (this.validateForm()) {
          this.currentStepNumber++
        }
        console.log(this.formData)
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

  h3,
  p {
    text-align: center;
  }
}

.stepper {
  justify-content: center;
}

.form {
  display: grid;
  gap: 40px;
}

.form-navigation {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}

.form-navigation-first-step {
  justify-content: flex-end;
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
</style>

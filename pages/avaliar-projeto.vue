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
        :value="formData[item.dataLabel]"
        v-bind="item" 
        @input="($event) => {
          if (item.name == 'cv-text-input')
            setFormData({ ...formData, [item.dataLabel]: $event })
        }" 
        @change="($event) => {
        if (item.name != 'cv-text-input')
          setFormData({ ...formData, [item.dataLabel]: $event })
        }" 
      />

      <div :class='["form-navigation", {
          "form-navigation-first-step": currentStepNumber == 0
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
    }
  },
  computed: {
    ...mapGetters('keyword', ['keywordsByCategory']),
    ...mapGetters('indicator', ['indicatorsByCategory']),
    ...mapGetters('formData', ['formData']),
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
  async beforeMount() {
    await this.getKeywords();
    await this.getIndicators();  
  },
  watch: {
    currentStepNumber: {
      immediate: true,
      async handler(newValue) {
        const newSteps = formSteps.steps[newValue]

        switch (newValue) {
          case 1:
            this.currentStep = newSteps.map(field => ({
              ...field,
              options: this.mapOptions(
                this.keywordsByCategory(field.dataLabel)
              )
            }))
            break;
          case 2:
            this.currentStep = newSteps.map(field => ({
              ...field,
              options: this.mapOptions(
                this.indicatorsByCategory(field.dataLabel)
              )
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
    ...mapActions('indicator', ['getIndicators']),
    ...mapActions('formData', ['setFormData']),
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
        : this.currentStep.some((item) => !!this.formData[item.dataLabel])
    },
    previousButton() {
      setTimeout(() => {
        this.currentStepNumber--
      }, 100)
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

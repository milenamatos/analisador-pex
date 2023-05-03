<template>
  <div class="avaliar-projeto">
    <h3>Avalie seu projeto de acordo com os indicadores FORPROEX e Objetivos de Desenvolvimento Sustentável!</h3>

    <p>Preencha as informações no formulário abaixo para realizar sua avaliação. Seus dados não serão salvos nem
      compartilhados.</p>

    <cv-progress class="stepper" :initial-step="currentStepNumber" :steps="steps" />

    <div class="form">
      <component :is="item.name" v-for="(item, index) in currentStep" v-bind="item" :key="index" />

      <div :class='["form-navigation", {
          "form-navigation-first-step": currentStepNumber == 0
        }]'>
        <cv-button v-if="currentStepNumber > 0" kind="tertiary" @click="currentStepNumber--">
          Voltar
        </cv-button>
        <cv-button :icon="nextButtonIcon" @click="currentStepNumber++">
          {{ nextButtonLabel }}
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import icon from "~/assets/icons/chevron-right.svg"
import formSteps from '~/assets/form-steps.json'
import FormReview from "~/components/form-review"

export default {
  name: 'AvaliarProjetoPage',
  components: {
    "form-review": FormReview,
    icon,
  },
  data() {
    return {
      chevronRightIcon: require('~/assets/icons/chevron-right.svg'),
      playIcon: require('~/assets/icons/play.svg'),
      currentStepNumber: 0,
      steps: formSteps.stepNames,
    }
  },
  created() {
    console.log(icon)
  },
  computed: {
    currentStep() {
      return formSteps.steps[this.currentStepNumber]
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
        ? "Realizar Avaliação"
        : "Próximo"
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

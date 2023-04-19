<template>
  <div class="avaliar-projeto">
    <h3>Avalie seu projeto de acordo com os indicadores FORPROEX e Objetivos de Desenvolvimento Sustentável!</h3>
    
    <p>Preencha as informações no formulário abaixo para realizar sua avaliação. Seus dados não serão salvos nem compartilhados.</p>

    <cv-progress
    class="stepper"
    :initial-step="currentStepNumber"
    :steps="steps" />

    <div class="form">
      <component :is="item.name" v-for="item in currentStep" v-bind="item"/>
    </div>
  </div>
</template>

<script>
import formSteps from '~/assets/form-steps.json'

export default {
  name: 'AvaliarProjetoPage',
  data() {
    return {
      currentStepNumber: 0,
      steps: formSteps.steps,
    }
  },
  computed: {
    currentStep() {
      return formSteps[this.currentStepNumber]
    }
  }
}
</script>

<style lang="scss">
@import "../styles/carbon";
.avaliar-projeto {
  display: grid;
  margin-top: 16px;
  text-align: unset;

  h3, p {
    text-align: center;
  }
}

.stepper {
  justify-content: center;
}

.bx--progress-step, .bx--progress-line {
  width: 15rem !important;
}

.bx--progress-label {
  max-width: 15rem !important;
}
</style>

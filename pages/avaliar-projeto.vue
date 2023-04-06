<template>
  <cv-progress
  :initial-step="initialStep"
  :steps="steps"></cv-progress>
</template>

<script>
export default {
  name: 'AvaliarProjetoPage',
  data() {
    return {
      initialStep: 2,
      steps: [
        "Step 1",
        "Step 2 overflows and shows a tip",
        "Step 3",
        "Step 4",
        "Step 5"
      ],
    }
  }
}
</script>

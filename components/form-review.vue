<template>
  <div class="form-review">
    <h5>Nome:</h5>
    <span>{{ formData.name }}</span>

    <h5>Descrição:</h5>
    <span>{{ formData.description }}</span>

    <h5>Tópicos:</h5>
    <div>
      <cv-tag 
        v-for="(item, index) in formatSelectedOptions('keywords')" 
        :key="index"
        :label="keywordList[item.id]"
        filter
        @remove="removeItem(item)">
      </cv-tag>
    </div>

    <h5>Indicadores:</h5>
    <div>
      <cv-tag 
        v-for="(item, index) in formatSelectedOptions('indicators')" 
        :key="index"
        :label="indicatorList[item.id]"
        :kind="item.style.color"
        :class="item.style.class"
        filter
        @remove="removeItem(item)">
      </cv-tag>
    </div>
  </div>
</template>

<script>
import formSteps from '~/assets/form-steps.json'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FormReview',
  data() {
    return {
      colors: ["blue", "green", "red"],
      stepNumber: {
        'keywords': 1,
        'indicators': 2
      }
    };
  },
  computed: {
    ...mapGetters('keyword', ['keywordList']),
    ...mapGetters('indicator', ['indicatorList']),
    ...mapGetters('formData', ['formData'])
  },
  methods: {
    ...mapActions('formData', ['setFormData']),
    formatSelectedOptions(type) {
      const stepNumber = this.stepNumber[type]
      const fieldsConfig = formSteps.steps[stepNumber].map(field => {
        return {
          label: field.dataLabel, 
          style: field.style 
        }
      })

      const selected = []
      fieldsConfig.forEach(({label, style}) => {
        this.formData[label]?.forEach(id => {
          selected.push({id, label, style})
        })
      })
      console.log(selected)
      return selected
    },
    removeItem(item) {
      const {id, label} = item
      const updatedList = this.formData[label].filter(value => value != id)
      this.setFormData({ ...this.formData, [label]: updatedList })
    }
  }
};
</script>

<style lang="scss">
@import "../styles/carbon";

.form-review {
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-top: 24px;
  row-gap: 24px;
}

.tag--orange {
  background-color: $yellow-20 !important;
  color: $yellow-70 !important;
}
</style>
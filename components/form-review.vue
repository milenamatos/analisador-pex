<template>
  <div>
    <h4 class="title">Dados informados:</h4>

    <div class="form-review">
      <h5>Nome:</h5>
      <span>{{ formData.name }}</span>

      <h5>Descrição:</h5>
      <span v-if="formData.description">{{ formData.description }}</span>
      <span v-else class="description">*Não informado*</span>

      <h5>Tópicos:</h5>
      <div>
        <cv-link 
          v-for="(item, index) in selectedData.keywords" 
          :key="index"
        >
          <cv-tag 
            :label="keywordList[item.id].name"
            :filter="filter"
            @remove="removeItem(item)">
          </cv-tag>
        </cv-link>
      </div>

      <h5>Indicadores:</h5>
      <div>
        <cv-link
          v-for="(item, index) in selectedData.indicators" 
          :key="index"
        >
          <cv-tag  
            :label="indicatorList[item.id][label]"
            :kind="item.style.color"
            :class="item.style.class"
            :filter="filter"
            @remove="removeItem(item)">
          </cv-tag>
        </cv-link>
      </div>
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
      colors: ["blue", "green", "red"]
    };
  },
  props: {
    filter: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: 'name'
    }
  },
  computed: {
    ...mapGetters('keyword', ['keywordList']),
    ...mapGetters('indicator', ['indicatorList']),
    ...mapGetters('formData', ['formData', 'formattedData']),
    selectedData() {
      const formatted = {}
      Object.keys(formSteps.stepNumber).forEach(type => {
        formatted[type] = this.formatSelectedOptions(type)
      })
      this.setFormattedData(formatted)

      return formatted
    }
  },
  methods: {
    ...mapActions('formData', ['setFormData', 'setFormattedData']),
    formatSelectedOptions(type) {
      const stepNumber = formSteps.stepNumber[type]
      const fieldsConfig = formSteps.steps[stepNumber].map(field => {
        return {
          label: field.dataLabel, 
          style: field.style 
        }
      })

      const selected = []
      fieldsConfig.forEach(({label, style}) => {
        this.formData[label]?.forEach(id => {
          const foundItem = selected.find(item => item.id === id)
          if (!foundItem) {
            selected.push({id, label, style})
          }
        })
      })
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

.title {
  margin: 24px auto;
}

.description {
  font-style: italic;
}

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

.bx--link:hover, .bx--link:active {
  color: inherit; 
  text-decoration: none; 
}
</style>
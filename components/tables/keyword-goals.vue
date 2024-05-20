<template>
  <KeywordGoalsTemplate 
    title="Tópicos selecionados e ODS relacionados"
    helperText="A tabela abaixo apresenta a lista dos tópicos (palavras-chave) selecionados no formulário e seus respectivos ODS relacionados"
    :keywordList="keywords"
  />
</template>

<script>
import KeywordGoalsTemplate from './keyword-goals-template'
import { mapGetters } from 'vuex'

export default {
  name: 'KeywordGoals',
  components: {
    KeywordGoalsTemplate
  },
  computed: {
    ...mapGetters('formData', ['formattedData']),
    ...mapGetters('keyword', ['keywordList']),
    keywords() {
      return this.formattedData.keywords.map(item => this.keywordList[item.id])
    }
  }
}
</script>

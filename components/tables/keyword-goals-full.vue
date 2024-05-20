<template>
  <KeywordGoalsTemplate 
    title="Lista completa dos tópicos e ODS relacionados"
    helperText="A tabela abaixo apresenta a lista de tópicos (palavras-chave) sugeridos pela ONU e seus respectivos ODS"
    :keywordList="keywords"
  />
</template>

<script>
import KeywordGoalsTemplate from './keyword-goals-template'
import { mapState } from 'vuex'

export default {
  name: 'FullKeywordGoals',
  components: {
    KeywordGoalsTemplate
  },
  computed: {
    ...mapState('keyword', ['keywords']),
  }
}
</script>

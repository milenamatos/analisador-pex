<template>
  <div>
    <RelatedGoals 
      :relatedGoalsList="preAnalysisData"
      filter 
      @remove="removeItem"
    />
  </div>
</template>

<script>
import RelatedGoals from '~/components/tables/related-goals'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FormValidation',
  components: {
    RelatedGoals
  },
  computed: {
    ...mapState('formData', ['preAnalysisData'])
  },
  methods: {
    ...mapActions('formData', ['setPreAnalysisData']),
    removeItem({ index, goalId, type }) {
      const indexToBeRemoved = this.preAnalysisData[index][type].indexOf(goalId)
      const list = this.preAnalysisData
      const updatedList = JSON.parse(JSON.stringify(list));
      updatedList[index][type].splice(indexToBeRemoved, 1)
      
      this.setPreAnalysisData(updatedList)
    }
  }
};
</script>

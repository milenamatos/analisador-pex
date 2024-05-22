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
    ...mapState('formData', ['preAnalysisData', 'removedItems'])
  },
  methods: {
    ...mapActions('formData', ['setPreAnalysisData', 'setRemovedItems']),
    removeItem({ index, goalId, type, indicatorId }) {
      const indexToBeRemoved = this.preAnalysisData[index][type].indexOf(goalId)
      const list = this.preAnalysisData
      const updatedList = JSON.parse(JSON.stringify(list));
      updatedList[index][type].splice(indexToBeRemoved, 1)
      
      this.setPreAnalysisData(updatedList)
      this.setRemovedItems([...this.removedItems, { goalId, type, indicatorId }])
    }
  }
};
</script>

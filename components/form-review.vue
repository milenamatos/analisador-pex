<template>
  <div class="form-review">
    <h5>Nome:</h5>
    <span>EMTU</span>

    <h5>Descrição:</h5>
    <span>EMTU</span>

    <h5>Tópicos:</h5>
    <div>
      <cv-tag 
        v-for="(item, index) in topics" 
        :key="index"
        :label="item"
        filter
        @remove="topics.splice(index, 1)">
      </cv-tag>
    </div>

    <h5>Indicadores:</h5>
    <div>
      <cv-tag 
        v-for="(item, index) in indicators" 
        :key="index"
        :label="item.label"
        :kind="item.kind"
        :class="item.className"
        filter
        @remove="indicators.splice(index, 1)">
      </cv-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormReview',
  data() {
    return {
      topics: ["teste1", "teste2", "banana", "uva", "pera"],
      indicators: [{
        label: "teste1",
        kind: "blue"
      }, {
        label: "teste2",
        kind: "green"
      },{
        label: "teste3",
        kind: "red"
      },{
        label: "teste4",
        className: "tag--orange"
      },]
    };
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
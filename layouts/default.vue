<template>
  <div>
    <HeaderNav />
    
    <div class="container bx--content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import HeaderNav from '~/components/header-nav.vue';

export default {
  name: 'Default',
  components: {
    HeaderNav,
  },
}
</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #2E495E;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>

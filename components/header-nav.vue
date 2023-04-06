<template>
  <cv-header aria-label="Header" class="header-menu">   
    <cv-header-name>
      AVEX
    </cv-header-name>
    
    <cv-header-nav aria-label="Navegação menu">
      <cv-header-menu-item class="header-menu__item" href="/avaliar-projeto">
        Avaliar projeto
      </cv-header-menu-item>
      <cv-header-menu-item class="header-menu__item">
        Sobre nós
      </cv-header-menu-item>
      <cv-header-menu-item class="header-menu__item">
        Tutorial
      </cv-header-menu-item>
    </cv-header-nav>
  </cv-header>
</template>

<script>
export default {
  name: 'HeaderNav',
};
</script>

<style lang="scss">
@import "../styles/carbon";
.header-menu {
  background-color: $carbon--blue-40 !important;
  
  a {
    color: white !important;

    &:hover {
      background-color: $carbon--blue-50 !important;
    }
  }
}
</style>
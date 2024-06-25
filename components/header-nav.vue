<template>
  <cv-header aria-label="Header" class="header-menu">   
    <cv-header-name href="/">
      Analisador PEX
    </cv-header-name>
    
    <cv-header-nav aria-label="Navegação menu">
      <cv-header-menu-item class="header-menu__item" href="/analisar-projeto">
        Faça uma análise!
      </cv-header-menu-item>
      
      <cv-header-menu aria-label="Conteúdo" title="Conteúdo">
        <cv-header-menu-item class="header-menu__item" href="/sobre">
          Sobre o projeto
        </cv-header-menu-item>
        <cv-header-menu-item class="header-menu__item" href="/metodologia">
          Metodologia
        </cv-header-menu-item>
        <cv-header-menu-item class="header-menu__item" href="/ibeu">
          IBEU
        </cv-header-menu-item>
      </cv-header-menu>
      
      <cv-header-menu-item class="header-menu__item" href="/tutorial">
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
.header-menu, .bx--header__menu-item {
  background-color: $link-02 !important;
  
  a {
    color: white !important;
  }

  a:hover, a.bx--header__menu-item:active, .bx--header__action:active {
    background-color: $hover-primary !important;
  }
}
</style>
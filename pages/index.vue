<template>
  <div class="fill-available">
    <h1>Analisador de Projetos de Extensão</h1>

    <div class="index-container">
      <cv-tile class="tile-content">        
        <p>
          Considerando o contexto das universidades, o Analisador PEX (Projetos de Extensão) foi desenvolvido com o objetivo de auxiliar na visualização de informações úteis para a autoavaliação dos projetos de extensão universitária. Para isto, a ferramenta realiza uma análise por meio de cruzamentos entre indicadores dde extensão e ODS (Objetivos de Desenvolvimento Sustentável), criando uma maneira alternativa de se avaliar os projetos. 
        </p>

        <p>
          Os indicadores utilizados são os Indicadores Brasileiros de Extensão Universitária (IBEU) estabelecidos pelo FORPROEX e utilizados no ramo acadêmico para medir e avaliar os projetos de extensão. Para mais detalhes, veja o relatório completo <cv-link href="https://docs.wixstatic.com/ugd/ff2fac_3bdef56a32ce47b18c83a6d911669596.pdf" target="_blank">aqui</cv-link>. 
          Já os ODS são todos os 17 objetivos definidos pela ONU, que estão ilustrados na figura ao lado. Para mais detalhes visite o <cv-link href="https://brasil.un.org/pt-br/sdgs" target="_blank">site oficial da ONU no Brasil</cv-link> (ou clique na imagem).
        </p>

        <p>
          Esta ferramenta foi desenvolvida como trabalho de conclusão de curso (TCC) para o curso de Ciência da Computação na UNIFESP. A metodologia utilizada para implementação desta ferramenta foi apresentada no trabalho de Mestrado Profissional de Inovação Tecnológica "Ferramenta para análise de projetos de Extensão Universitária sob a ótica da relação entre os Indicadores de Extensão e os ODS" <cv-link href="https://repositorio.unifesp.br/items/07c9b1d6-7de9-49fa-9d20-ae46eb8c8a7c">(BRAGA, 2023)</cv-link>. 
        </p>

        <div class="cta-buttons">
          <cv-button kind="tertiary" @click="$router.push('/sobre')">Saiba mais sobre o projeto</cv-button>

          <cv-button @click="$router.push('/analisar-projeto')">Faça agora uma análise!</cv-button>
        </div>
      </cv-tile>

      <cv-link 
        class="fill-available" 
        href="https://brasil.un.org/pt-br/sdgs" 
        target="_blank"
      >
        <img src="../assets/images/ODS.png" class="fill-available">
      </cv-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style lang="scss">
.index-container {
  align-items: center;
  margin-top: 32px;

  @media screen and (min-width: 1200px) {
    display: grid; 
    grid-template-columns: 50% 50%;
  }
}

.tile-content {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  text-align: justify;  
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  @media screen and (min-width: 1200px) {  
    flex-direction: row;
    justify-content: space-evenly;
  }

  button {
    max-width: -webkit-fill-available;
  }
}

.fill-available {
  width: -webkit-fill-available;
}
</style>
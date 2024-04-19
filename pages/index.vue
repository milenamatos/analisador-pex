<template>
  <div class="fill-available">
    <h1>Analisador de Projetos de Extensão</h1>

    <div class="index-container">
      <cv-tile class="tile-content">        
        <p>
          O Analisador PEX foi desenvolvida com o objetivo de auxiliar na visualização de informações úteis para a autoavaliação dos programas e projetos de extensão universitária. Para isto, a ferramenta realiza uma análise quantitativa por meio de cruzamentos entre os <cv-link href="https://docs.wixstatic.com/ugd/ff2fac_3bdef56a32ce47b18c83a6d911669596.pdf" target="_blank">Indicadores Brasileiros de Extensão Universitária</cv-link> (IBEU) e os <cv-link href="https://brasil.un.org/pt-br/sdgs" target="_blank">Objetivos de Desenvolvimento Sustentável</cv-link> (ODS), oferecendo uma maneira alternativa de se analisar os projetos sob estas duas óticas.
        </p>

        <p>
          A ferramenta solicita apenas informações básicas sobre o programa ou projeto de extensão: título e descrição, seleção de tópicos relacionados aos projetos e seleção de indicadores de extensão considerados relevantes. Nenhum dado pessoal é solicitado ou armazenado pela ferramenta. Após a entrada de informações, são apresentados gráficos e tabelas indicando os ODS relacionados e os indicadores do conjunto IBEU mais relevantes. É possível fazer o download em PDF do relatório.
        </p>

        <p>
          Esta ferramenta web foi desenvolvida como Trabalho de Conclusão de Curso (TCC) para o curso de Ciência da Computação do ICT-UNIFESP. A metodologia utilizada foi apresentada originalmente no trabalho de Mestrado Profissional em Inovação Tecnológica da mesma instituição: "Ferramenta para análise de projetos de Extensão Universitária sob a ótica da relação entre os Indicadores de Extensão e os ODS" <cv-link href="https://repositorio.unifesp.br/items/07c9b1d6-7de9-49fa-9d20-ae46eb8c8a7c" target="_blanl">(disponível neste link)</cv-link>.
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
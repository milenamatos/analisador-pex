<template>
  <div class="fill-available">
    <h1>Analisador de Projetos de Extensão</h1>

    <div class="index-container">
      <cv-tile class="tile-content">
        <p>
          Esta ferramenta foi desenvolvida como trabalho de conclusão de curso (TCC) para o curso de Ciência da Computação na UNIFESP.
        </p>
        
        <p>
          O objetivo do Analisador PEX é realizar uma análise de projetos de Extensão Universitária sob a ótica da relação entre os Indicadores de Extensão e os ODS (Objetivos de Desenvolvimento Sustentável). Todos os 17 ODS estão ilustrados na figura ao lado. 
          Para mais detalhes visite o <cv-link href="https://brasil.un.org/pt-br/sdgs" target="_blank">site oficial da ONU no Brasil</cv-link> (ou clique na imagem).
        </p>

        <p>
          Este projeto implementa a metodologia apresentada no trabalho de Mestrado Profissional de Inovação Tecnológica "Ferramenta para análise de projetos de Extensão Universitária sob a ótica da relação entre os Indicadores de Extensão e os ODS" <cv-link href="https://repositorio.unifesp.br/items/07c9b1d6-7de9-49fa-9d20-ae46eb8c8a7c">(BRAGA, 2023)</cv-link>. 
        </p>

        <div class="cta-buttons">
          <cv-button kind="tertiary" @click="$router.push('/sobre')">Saiba mais sobre o projeto</cv-button>

          <cv-button @click="$router.push('/analisar-projeto')">Faça agora uma análise!</cv-button>
        </div>
      </cv-tile>

      <cv-link href="https://brasil.un.org/pt-br/sdgs" target="_blank">
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

<style>
.index-container {
  align-items: center;
  display: grid;
  grid-template-columns: 40% 60%;
  margin-top: 32px;
}

.tile-content{
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  text-align: justify;  
}

.cta-buttons {
  display: flex;
  justify-content: space-evenly;
}

.fill-available {
  width: -webkit-fill-available;
}
</style>
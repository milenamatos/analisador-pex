<template>
  <div class="metodologia content">
    <h1 class="title">Metodologia BSC X TBL</h1>

    <p class="title">Esta página apresenta um resumo sobre a metodologia BSC X TBL utilizada no desenvolvimento desta ferramenta</p>

    <cv-tile class="content">
      <p>
        O objetivo do Analisador PEX (Projetos de Extensão) é auxiliar na visualização de informações úteis para a
        autoavaliação dos projetos de extensão universitária. Para isto, a ferramenta realiza uma série de análises
        utilizando os ODS (Objetivos de Desenvolvimento Sustentável) e os IBEU (Indicadores Brasileiros de Extensão
        Universitária), criando uma maneira alternativa de se avaliar os projetos. Os indicadores utilizados são os 52
        Indicadores Brasileiros de Extensão Universitária (IBEU) estabelecidos pelo
        FORPROEX e utilizados no ramo acadêmico para medir e avaliar os projetos de extensão. Para mais detalhes, veja o
        <cv-link href="https://docs.wixstatic.com/ugd/ff2fac_3bdef56a32ce47b18c83a6d911669596.pdf"
          target="_blank">Relatório de Pesquisa oficial</cv-link>. Já os ODS são todos os 17 objetivos definidos pela
        ONU.
        Para mais detalhes visite o <cv-link href="https://brasil.un.org/pt-br/sdgs" target="_blank">site oficial da ONU
          no Brasil</cv-link>.
      </p>

      <p>
        A metodologia utiliza métodos de gestão estratégica e sustentável estruturados pelo modelo <em>Balanced
          Scorecard</em> (BSC) aliado ao modelo <em>Triple Bottom Line (TBL)</em>. O mapa estratégico sobre a extensão
        universitária desenvolvido pelo <cv-link
          href="https://docs.wixstatic.com/ugd/ff2fac_3bdef56a32ce47b18c83a6d911669596.pdf"
          target="_blank">FORPROEX</cv-link> incorporou a metodologia empregada pelo modelo BSC utilizando os 52
        indicadores de avaliação da Extensão Universitária e adaptando os quatro quadrantes tradicionais do modelo BSC
        para quadrantes que representam as seguintes perspectivas: <strong>Do Aluno, da Sociedade e dos Financiadores
          Públicos; Dos Processos Internos; Da Aprendizagem e Crescimento; Dos Recursos Financeiros e Infraestrutura
        </strong>. Adicionalmente, a autora da dissertação na qual esta ferramenta se baseia, distribuiu os ODS nos
        pilares definidos pelo TRBL, são eles: <strong>Sociocultural, Meio Ambiente e Econômico.</strong>
      </p>

      <p>
        A partir desses modelos, apresenta-se uma ferramenta que possibilita avaliar preliminarmente o tipo de relação
        existente entre os projetos e programas de Extensão Universitária (com base em suas características e seleção de
        indicadores FORPROEX) e os ODS por meio de gráficos e tabelas. A união de metodologias como o BSC e o TBL tem o
        objetivo de atender à crescente demanda por estratégias que combinem meio ambiente, sociedade e questões éticas
        com formas de medir o desempenho sustentável no ambiente corporativo utilizando estratégias de avaliação que
        combinam mais de um framework.
      </p>

      <p>
        Desta forma foi definida a metodologia híbrida de cruzamento entre o BSC e o TBL: uma matriz de cruzamento 52 x
        17, denominada Matriz de Referência, apresenta os Indicadores de Extensão Universitária do FORPROEX nas linhas,
        distribuídos de acordo com os quadrantes do BSC, e nas colunas os ODS distribuídos dentro dos pilares de
        sustentabilidade do modelo TBL. Com base nessa Matriz são realizados cruzamentos e análises para aferir a
        aderência de um programa ou projeto de extensão aos ODS com base nos dados informados (informações de entrada)
        para o projeto analisado.
      </p>

      <p>
        As análises realizadas são as seguintes:
        <cv-list ordered>
          <cv-list-item> ODS associados ao projeto </cv-list-item>
          <cv-list-item>
            Mapa estratégico dos IBEU relacionados ao projeto
            <cv-list nested>
              <cv-list-item>Distribuição segundo o BSC</cv-list-item>
              <cv-list-item>Distribuição segundo o TBL</cv-list-item>
              <cv-list-item>Relação entre BSC e TBL</cv-list-item>
            </cv-list>
          </cv-list-item>
        </cv-list>
      </p>

      <p>
        A ferramenta "Analisador PEX" foi desenvolvida como Trabalho de Conclusão de Curso (TCC) para o curso de Ciência
        da Computação na UNIFESP. A metodologia utilizada foi apresentada originalmente no trabalho de Mestrado
        Profissional em Inovação Tecnológica da mesma instituição: "Ferramenta para análise de projetos de Extensão
        Universitária sob a ótica da relação entre os Indicadores de Extensão e os ODS" <cv-link
          href="https://repositorio.unifesp.br/items/07c9b1d6-7de9-49fa-9d20-ae46eb8c8a7c" target="_blanl">(disponível
          neste link)</cv-link>.
      </p>
    </cv-tile>
  </div>
</template>

<script>
export default {
  name: 'MetodologiaPage'
}
</script>

<style lang="scss">
@import "../styles/carbon";

.metodologia {
  display: grid;
  grid-gap: 24px;
  margin-top: 20px;
  text-align: justify;
  width: 90%;
}

.title {
  margin: 0px auto;
}

.content {
  display: grid;
  grid-gap: 24px;
}

.content .bx--list--ordered {
  padding: 0 20px;
}

.content .bx--list--nested {
  margin: 0;
}
</style>
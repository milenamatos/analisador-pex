import apexApi from 'assets/services/apex-api'

export const state = () => ({
  indicators: []
})

export const getters = {
  indicators: (state) => (category) =>
    state.indicators
      .filter((indicator) => indicator.Category.label === category)
      .map(indicator => ({ ...indicator, name: `${indicator.name} - ${indicator.description}` })),

  indicatorList: (state) =>
    state.indicators.reduce((result, indicator) => {
      result[indicator.id] = {
        ...indicator,
        formattedName: `${indicator.name} - ${indicator.description}`
      };
      return result;
    }, {})
}

export const mutations = {
  setIndicators(state, value) {
    state.indicators = value
  }
}

export const actions = {
  async getIndicators({ commit }) {
    const { data } = await apexApi.get("/indicators")
    commit('setIndicators', data)
  }
}

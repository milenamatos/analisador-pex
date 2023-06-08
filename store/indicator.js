import avexApi from 'assets/services/avex-api'

export const state = () => ({
  indicators: []
})

export const getters = {
  indicatorsByCategory: (state) => (category) => 
    state.indicators
      .filter((indicator) => indicator.Category.label === category)
      .map(indicator => ({ ...indicator, name: `${indicator.name} - ${indicator.description}` }))
}

export const mutations = {
  setIndicators (state, value) {
    state.indicators = value
  }
}

export const actions = {
  async getIndicators ({ commit }) {
    const { data } = await avexApi.get("/indicators")
    commit('setIndicators', data)
  }
}

import avexApi from 'assets/services/avex-api'

export const state = () => ({
  keywords: []
})

export const getters = {
  keywordsByCategory: (state) => (category) => 
    state.keywords.filter((keyword) => keyword.Goal.Category.label === category)
}

export const mutations = {
  setKeywords (state, value) {
    state.keywords = value
  }
}

export const actions = {
  async getKeywords ({ commit }) {
    const { data } = await avexApi.get("/keywords")
    commit('setKeywords', data)
  }
}

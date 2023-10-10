export const state = () => ({
  formData: {},
  formattedData: {}
})

export const getters = {
  formData: (state) => state.formData,
  formattedData: (state) => state.formattedData 
}

export const mutations = {
  setFormData (state, value) {
    state.formData = value
  },

  setFormattedData (state, value) {
    state.formattedData = value
  }
}

export const actions = {
  setFormData ({ commit }, data) {
    commit('setFormData', data)
  },

  setFormattedData ({ commit }, data) {
    commit('setFormattedData', data)
  },

  async fetchAnalysis({ commit, state, rootGetters }) {
    const keywordList = rootGetters['keyword/keywordList']
    const indicatorList = rootGetters['indicator/indicatorList']

    const goals = [...new Set(
      state.formattedData.keywords.map(item => keywordList[item.id].Goal.id)
    )]
    
    const indicators = state.formattedData.indicators.map(item => indicatorList[item.id].id)

    const body = { goals, indicators }
    console.log(body)
  }
}

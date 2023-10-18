import apexApi from 'assets/services/apex-api'

export const state = () => ({
  formData: {},
  formattedData: {},
  requestedAnalysis: false,
  relatedGoals: []
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
  },

  setRequestedAnalysis (state, value) {
    state.requestedAnalysis = value
  },

  setRelatedGoals (state, value) {
    state.relatedGoals = value
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
    const { data } = await apexApi.post("/goals", body)

    commit('setRequestedAnalysis', true)
    commit('setRelatedGoals', data)
  }
}

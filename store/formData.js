import apexApi from 'assets/services/apex-api'

export const state = () => ({
  formData: {},
  formattedData: {
    indicators: [],
    goals: []
  },
  requestedAnalysis: false,
  relatedGoals: []
})

export const getters = {
  formData: (state) => state.formData,
  formattedData: (state) => state.formattedData,
  groupedIndicators: (state) => 
    state.formattedData.indicators.reduce((result, indicator) => {
      result[indicator.label] = result[indicator.label]
        ? result[indicator.label]+1
        : 1
      return result;
    }, {})
}

export const mutations = {
  setFormData(state, value) {
    state.formData = value
  },

  setFormattedData(state, value) {
    state.formattedData = value
  },

  setRequestedAnalysis(state, value) {
    state.requestedAnalysis = value
  },

  setRelatedGoals(state, value) {
    state.relatedGoals = value
  }
}

export const actions = {
  setFormData({ commit }, data) {
    commit('setFormData', data)
  },

  setFormattedData({ commit }, data) {
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
    const { data: { relatedGoals } } = await apexApi.post("/analysis", body)

    commit('setRequestedAnalysis', true)
    commit('setRelatedGoals', relatedGoals)
  }
}

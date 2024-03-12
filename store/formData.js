import apexApi from 'assets/services/apex-api'

export const state = () => ({
  analysisData: {},
  formData: {},
  formattedData: {
    indicators: [],
    goals: []
  },
  requestedAnalysis: false,
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
    }, {}),
  getGoalDistribution: (state) => (goalId, relation) => {
    return state.analysisData.goalsDistribution.find(item => item.id == goalId && item.relation === relation)?.count || 0
  }
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

  setAnalysisData(state, value) {
    state.analysisData = value
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

    const goals = 
      state.formattedData.keywords.reduce((result, keyword) => {
        return result.concat(keywordList[keyword.id].goals)
      }, [])
      .map(goal => goal.id)

    const uniqueGoals = [...new Set(goals)]
    const indicators = state.formattedData.indicators.map(item => indicatorList[item.id].id)

    const body = { goals: uniqueGoals, indicators }
    const { data } = await apexApi.post("/analysis", body)

    commit('setRequestedAnalysis', true)
    commit('setAnalysisData', data)
  }
}

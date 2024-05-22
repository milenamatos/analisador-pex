import apexApi from 'assets/services/apex-api'

export const state = () => ({
  analysisData: {},
  preAnalysisData: [],
  formData: {},
  formattedData: {
    indicators: [],
    goals: []
  },
  requestedAnalysis: false,
  removedItems: []
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

  setAnalysisData(state, value) {
    state.analysisData = value
  },

  setPreAnalysisData(state, value) {
    state.preAnalysisData = value
  },

  setRemovedItems(state, value) {
    state.removedItems = value
  }
}

export const actions = {
  setFormData({ commit }, data) {
    commit('setFormData', data)
  },

  setFormattedData({ commit }, data) {
    commit('setFormattedData', data)
  },

  setPreAnalysisData({ commit }, data) {
    commit('setPreAnalysisData', data)
  },

  setRemovedItems({ commit }, data) {
    commit('setRemovedItems', data)
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

    const body = { goals: uniqueGoals, indicators, removedItems: state.removedItems }
    const { data } = await apexApi.post("/analysis", body)

    commit('setRequestedAnalysis', true)
    commit('setAnalysisData', {...data, relatedGoals: state.preAnalysisData})
  },

  async fetchPreAnalysis({ commit, state, rootGetters }) {
    const keywordList = rootGetters['keyword/keywordList']
    const indicatorList = rootGetters['indicator/indicatorList']

    const goals = 
      state.formattedData.keywords.reduce((result, keyword) => {
        return result.concat(keywordList[keyword.id].goals)
      }, [])
      .map(goal => goal.id)

    const uniqueGoals = [...new Set(goals)]
    const indicators = state.formattedData.indicators.map(item => indicatorList[item.id].id)

    const { data } = await apexApi.post("/pre-analysis", { goals: uniqueGoals, indicators })

    commit('setPreAnalysisData', data)
    commit('setRemovedItems', [])
  }
}

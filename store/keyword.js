import apexApi from 'assets/services/apex-api'

export const state = () => ({
  keywords: [],
  goals: []
})

export const getters = {
  keywords: (state) => (category) => 
    state.keywords.filter((keyword) => keyword.Goal.Category.label === category),
  
  keywordList: (state) => 
    state.keywords.reduce((result, keyword) => {
      result[keyword.id] = keyword;
      return result;
    }, {})
}

export const mutations = {
  setKeywords (state, value) {
    state.keywords = value
  },

  setGoals (state, value) {
    state.goals = value
  }
}

export const actions = {
  async getKeywords ({ commit }) {
    const { data } = await apexApi.get("/keywords")

    const goals = data.reduce((result, keyword) => {
      result[keyword.Goal.id] = keyword.Goal;
      return result;
    }, {})

    commit('setKeywords', data)
    commit('setGoals', goals)
  }
}

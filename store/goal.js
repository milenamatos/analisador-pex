import apexApi from 'assets/services/apex-api'

export const state = () => ({
  goals: []
})

export const getters = {
  goals: state => state.goals
}

export const mutations = {
  setGoals (state, value) {
    state.goals = value
  }
}

export const actions = {
  async getGoals ({ commit }) {
    const { data } = await apexApi.get("/goals")

    const goals = data.reduce((result, goal) => {
      result[goal.id] = goal;
      return result;
    }, {})

    commit('setGoals', goals)
  }
}

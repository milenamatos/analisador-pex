export const state = () => ({
  formData: {}
})

export const getters = {
  formData: (state) => state.formData 
}

export const mutations = {
  setFormData (state, value) {
    state.formData = value
  }
}

export const actions = {
  async setFormData ({ commit }, data) {
    commit('setFormData', data)
  }
}

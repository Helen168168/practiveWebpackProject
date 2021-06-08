const testStore = {
    state: {
        createdDate: '2021-06-08 00:00:00'
    },
    getters: {
        formatCreatedDate: state => {
            return state.createdDate
        }
    },
    mutations: {
        changeDate: (state, date) => {
            state.createdDate = date   
        }
    },
    actions: {
        CHANGE_DATE: ({ commit }, date) => {
            commit("changeDate", date)
        }
    }
}

export default { namespaced: true, ...testStore }
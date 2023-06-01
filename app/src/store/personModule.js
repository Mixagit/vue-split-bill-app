export const personModule = {
  state: () => ({
    persons: [
      { id: 1, name: 'Vasya' },
      { id: 2, name: 'Ivan' },
      { id: 3, name: 'Sanya' }
    ]
  }),
  getters: {},
  mutations: {
    ADD_PERSON(state, person) {
      state.persons.push(person);
    },
    REMOVE_PERSON(state, personId) {
      state.persons = state.persons.filter(p => p.id !== personId);
    }
  },
  actions: {
    createPerson({ commit }) {
      const person = {
        id: Date.now(),
        name: ''
      };
      commit('ADD_PERSON', person);
    },
    removePerson({ commit }, person) {
      commit('REMOVE_PERSON', person.id);
    }
  },
  namespaced: true
};

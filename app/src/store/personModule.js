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
    add(state, person) {
      state.persons.push(person);
    },
    remove(state, personId) {
      state.persons = state.persons.filter(p => p.id !== personId);
    }
  },
  actions: {
    createPerson({ commit }) {
      const person = {
        id: Date.now(),
        name: ''
      };
      commit('add', person);
    },
    removePerson({ commit }, person) {
      commit('remove', person.id);
    }
  },
  namespaced: true
};

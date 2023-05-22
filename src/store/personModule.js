
export const personModule = {
    state: () => ({
        persons: [
            {id: 1, name: 'Vasya'},
            {id: 2, name: 'Ivan'},
            {id: 3, name: 'Sanya'}
        ],
    }),
    getters: {

    },
    mutations: {
        setPersons(state, persons) {
            state.persons = persons;
        }
    },
    actions: {

    },
    namespaced: true
}
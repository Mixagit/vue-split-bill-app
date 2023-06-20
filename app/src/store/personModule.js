export const personModule = {
    state: () => ({
        persons: [
            { id: 1, name: "Vasya" },
            { id: 2, name: "Ivan" },
            { id: 3, name: "Sanya" },
        ],
    }),
    mutations: {
        add(state, person) {
            state.persons.unshift(person);
        },
        edit(state, { id, name }) {
            state.persons.find((p) => p.id === id).name = name;
        },
        remove(state, id) {
            state.persons = state.persons.filter((p) => p.id !== id);
        },
        resetPersons(state) {
            state.persons = [];
        },
    },
    actions: {
        createPerson({ commit }) {
            const person = {
                id: Date.now(),
                name: "",
            };
            commit("add", person);
        },
        editPerson({ commit }, { id, name }) {
            commit("edit", { id, name });
        },
        removePerson({ commit }, person) {
            commit("remove", person.id);
        },
    },
    namespaced: true,
};

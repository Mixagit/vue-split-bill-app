export const productModule = {
  state: () => ({
    products: [
      { id: 1, name: 'Огурец', price: 100, payer: null, consumers: [] },
      { id: 2, name: 'Помидор', price: 200, payer: null, consumers: [] },
      { id: 3, name: 'Баклажан', price: 300, payer: null, consumers: [] }
    ]
  }),
  getters: {},
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    add(state, product) {
      state.products.push(product);
    },
    editName(state, {id, name}) {
      state.products.find(p => p.id === id).name = name;
    },
    editPrice(state, {id, price}) {
      state.products.find(p => p.id === id).price = price;
    },
    editPayer(state, {id, payer}) {
      state.products.find(p => p.id === id).payer = payer;
    },
    toggleConsumer(state, {id, personName}) {
      const consumers = state.products.find(p => p.id === id).consumers
      const index = consumers.indexOf(personName);
      index === -1 ? consumers.push(personName) : consumers.splice(index, 1)
    },
    toggleAllConsumers(state, {id, personNames}) {
      const consumers = state.products.find(p => p.id === id).consumers
      state.products.find(p => p.id === id).consumers = []
      if (consumers.length !== personNames.length) {
        state.products.find(p => p.id === id).consumers = consumers.concat(personNames)
      }
    },
    remove(state, productId) {
      state.products = state.products.filter(p => p.id !== productId);
    }
  },
  actions: {
    createProduct({ commit }) {
      const product = {
        id: Date.now(),
        name: '',
        price: 0,
        payer: null,
        consumers: []
      };
      commit('add', product);
    },
    editProductName({ commit }, {id, name}) {
      commit('editName', {id, name});
    },
    editProductPrice({ commit }, {id, price}) {
      commit('editPrice', {id, price});
    },
    editProductPayer({ commit }, {id, payer}) {
      commit('editPayer', {id, payer});
    },
    toggleConsumer({ commit }, {id, personName}) {
      commit('toggleConsumer', {id, personName})
    },
    toggleAllConsumers({ commit }, {id, personNames}) {
      commit('toggleAllConsumers', {id, personNames})
    },
    removeProduct({ commit }, product) {
      commit('remove', product.id);
    }
  },
  namespaced: true
};

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
    removeProduct({ commit }, product) {
      commit('remove', product.id);
    }
  },
  namespaced: true
};

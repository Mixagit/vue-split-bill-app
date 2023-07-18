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
			state.products = products
		},
		add(state, product) {
			state.products.unshift(product)
		},
		editName(state, { id, name }) {
			state.products.find(p => p.id === id).name = name
		},
		editPrice(state, { id, price }) {
			state.products.find(p => p.id === id).price = price
		},
		editPayer(state, { id, payer }) {
			state.products.find(p => p.id === id).payer = payer
		},
		toggleConsumer(state, { id, person }) {
			const consumers = state.products.find(p => p.id === id).consumers
			const index = consumers.indexOf(person)
			index === -1 ? consumers.push(person) : consumers.splice(index, 1)
		},
		toggleAllConsumers(state, { id, persons }) {
			const consumers = state.products.find(p => p.id === id).consumers
			const flag = consumers.length !== persons.length
			consumers.splice(0, consumers.length)
			if (flag) {
				persons.forEach(c => consumers.push(c.id))
			}
		},
		remove(state, productId) {
			state.products = state.products.filter(p => p.id !== productId)
		},
		resetProducts(state) {
			state.products = []
		}
	},
	actions: {
		createProduct({ commit }) {
			const product = {
				id: Date.now(),
				name: '',
				price: '',
				payer: null,
				consumers: []
			}
			commit('add', product)
		},
		editProductName({ commit }, { id, name }) {
			commit('editName', { id, name })
		},
		editProductPrice({ commit }, { id, price }) {
			commit('editPrice', { id, price })
		},
		editProductPayer({ commit }, { id, payer }) {
			commit('editPayer', { id, payer })
		},
		toggleConsumer({ commit }, { id, person }) {
			commit('toggleConsumer', { id, person })
		},
		toggleAllConsumers({ commit }, { id, persons }) {
			commit('toggleAllConsumers', { id, persons })
		},
		removeProduct({ commit }, product) {
			commit('remove', product.id)
		}
	},
	namespaced: true
}

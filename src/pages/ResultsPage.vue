<template>
	<div class="container">
		<h1 class="header">Результаты</h1>
		<div
			v-if="persons.length > 0"
			class="list"
		>
			<h3>Кто кому должен</h3>
			<list-component>
				<div
					class="item"
					v-for="result in results"
					:key="results.indexOf(result)"
				>
					{{ result }}
				</div>
			</list-component>
		</div>
		<button
			type="button"
			class="btn next__btn"
			:class="{ disabledNextBtn: isDisabledNextBtn }"
			@click="goToReload"
		>
			{{ nextButtonText }}
		</button>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ListComponent from '@/components/ListComponent.vue'

export default {
	components: { ListComponent },
	data() {
		return {
			nextButtonText: 'Перейти к новому счёту',
			results: []
		}
	},
	computed: {
		...mapState({
			products: state => state.product.products,
			persons: state => state.person.persons
		})
	},
	mounted() {
		this.calcWhoOwesWhom()
	},
	methods: {
		...mapMutations({
			resetPersons: 'person/resetPersons',
			resetProducts: 'product/resetProducts'
		}),
		goToReload() {
			this.resetProducts()
			this.resetPersons()
			this.$router.push('/persons')
		},
		getPersonName(id) {
			if (id === 0) return 'nobody'
			return this.persons.find(p => p.id === id).name
		},
		calculateTotalPersonEaten(personId) {
			let sum = 0
			this.products.forEach(product => {
				if (product.consumers.includes(personId)) {
					sum += product.price / product.consumers.length
				}
			})
			return sum
		},
		calculateTotalPersonExpenses(personId) {
			let sum = 0
			this.products.forEach(product => {
				if (product.payer === personId) {
					sum += product.price
				}
			})
			return sum
		},
		calcWhoOwesWhom() {
			const debtorList = []
			const owedList = []
			let totalExpenses = 0
			let totalEaten = 0

			this.persons.forEach(person => {
				totalExpenses = this.calculateTotalPersonExpenses(person.id)
				totalEaten = this.calculateTotalPersonEaten(person.id)
				if (totalExpenses > totalEaten) {
					debtorList.push({
						id: person.id,
						balance: totalExpenses - totalEaten
					})
				} else if (totalEaten > totalExpenses) {
					owedList.push({
						id: person.id,
						balance: totalEaten - totalExpenses
					})
				}
			})

			while (debtorList.length > 0 || owedList.length > 0) {
				const debtor = debtorList[0]
				const owed = owedList[0]
				console.log('debtor - ', debtor)
				console.log('owed - ', owed)
				if (!owed && !debtor) {
					this.results.push('Никто никому ничего не должен!')
					return
				} else if (!owed || !debtor) {
					return
				}
				if (owed.balance < debtor.balance) {
					this.results.push(
						this.getPersonName(owed.id) +
							' должен ' +
							this.getPersonName(debtor.id) +
							' - ' +
							owed.balance.toFixed(2)
					)
					debtor.balance -= owed.balance
					owedList.shift()
				} else if (owed.balance > debtor.balance) {
					this.results.push(
						this.getPersonName(owed.id) +
							' должен ' +
							this.getPersonName(debtor.id) +
							' - ' +
							debtor.balance.toFixed(2)
					)
					owed.balance -= debtor.balance
					debtorList.shift()
				} else if (owed.balance === debtor.balance) {
					this.results.push(
						this.getPersonName(owed.id) +
							' должен ' +
							this.getPersonName(debtor.id) +
							' - ' +
							debtor.balance.toFixed(2)
					)
					owedList.shift()
					debtorList.shift()
				}
			}
		}
	}
}
</script>

<style lang="sass"></style>

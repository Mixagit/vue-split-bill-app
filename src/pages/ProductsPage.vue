<template>
	<div class="container">
		<h1 class="header">Добавление позиций меню</h1>
		<button
			type="button"
			class="btn add__btn"
			@click="add"
		>
			<i class="bi bi-bag-plus-fill"></i>
			Добавить позицию
		</button>
		<div
			v-if="persons.length < 2"
			class="empty__list"
		>
			<h4>Недостаточно людей</h4>
			<p>
				Вы можете добавить людей, которые есть в вашем чеке по этой
				<span
					class="link"
					@click="$router.push('/persons')"
					>ссылке</span
				>
			</p>
		</div>
		<div
			v-else-if="persons.some(person => person.name === '')"
			class="empty__list"
		>
			<h4>Пустые имена</h4>
			<p>
				Вы не дали имена всем добавленным людям. Вы можете вернуться назад по
				<span
					class="link"
					@click="$router.push('/persons')"
					>ссылке</span
				>
				и исправить это!
			</p>
		</div>
		<div
			v-else-if="products.length > 0"
			class="list"
		>
			<h3>Список продуктов</h3>
			<list-component>
				<div
					class="item"
					v-for="product in products"
					:key="product.id"
				>
					<div class="params">
						<div class="top__params">
							<div class="name">
								<div class="inp__icon">
									<input
										v-focus
										:value="product.name"
										@input="handleNameChange($event, product)"
										type="text"
										placeholder="Введите название..."
										class="input"
									/>
									<i
										class="bi bi-pencil-fill edit_icon hidden__btn"
										@click.native="focusInput"
									></i>
								</div>
								<error-hint
									:errors="nameErrors"
									:itemId="product.id"
									>Введите название этого продукта!</error-hint
								>
							</div>
							<div class="price">
								<div class="inp__icon">
									<input
										:value="product.price"
										@input="handlePriceChange($event, product)"
										type="number"
										placeholder="Введите цену..."
										class="input"
									/>
									<i
										class="bi bi-pencil-fill edit_icon hidden__btn"
										@click.native="focusInput"
									></i>
								</div>

								<error-hint
									:errors="priceErrors"
									:itemId="product.id"
									>Введите цену этого продукта!</error-hint
								>
							</div>

							<div class="payer">
								<select
									name="payer"
									class="form-select select"
									@change="
										e =>
											editProductPayer({
												id: product.id,
												payer: +e.target.value
											})
									"
									:value="product.payer"
								>
									<option
										v-for="person in persons"
										:key="person.id"
										:value="person.id"
									>
										{{ person.name }}
									</option>
								</select>
								<i class="bi bi-credit-card-fill payer__icon"></i>
							</div>
						</div>

						<div class="consumers">
							<div
								class="check__pers"
								@click="
									toggleAllConsumers({
										id: product.id,
										persons: persons
									})
								"
							>
								<div
									class="circle not_selected"
									:class="{
										selected: product.consumers.length === persons.length
									}"
									checked
								>
									&infin;
								</div>
								<div class="avatar__label">All</div>
							</div>

							<div
								v-for="person in persons"
								:key="person.id"
								class="check__pers"
								@click="
									toggleConsumer({
										id: product.id,
										person: person.id
									})
								"
							>
								<Avatar
									:name="!product.consumers.includes(person.id) ? person.name : '&#10003;'"
									class="circle not_selected"
									:class="{
										selected: product.consumers.includes(person.id)
									}"
								/>
								<div class="avatar__label">
									{{ person.name }}
								</div>
							</div>
						</div>
					</div>

					<button
						type="button"
						class="btn remove__btn hidden__btn"
						@click="removeProduct(product)"
					>
						Удалить
					</button>
				</div>
			</list-component>
		</div>
		<div
			v-else
			class="empty__list"
		>
			<h4>Список продуктов пуст</h4>
			<p>Вы можете добавить продукты из вашего чека по кнопке выше</p>
		</div>

		<button
			type="button"
			class="btn next__btn"
			:class="{ disabledNextBtn: isDisabledNextBtn }"
			@click="goToResultsPage"
		>
			{{ nextButtonText }}
		</button>
	</div>
</template>

<script>
import { nextTick } from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import ListComponent from '@/components/ListComponent.vue'
import Avatar from '@/components/Avatar.vue'
import ErrorHint from '@/components/ErrorHint.vue'

export default {
	components: { ListComponent, Avatar, ErrorHint },
	data() {
		return {
			nameErrors: [],
			priceErrors: [],
			isDisabledNextBtn: false,
			nextButtonText: 'Перейти к результатам'
		}
	},
	computed: {
		...mapState({
			products: state => state.product.products,
			persons: state => state.person.persons
		})
	},
	methods: {
		...mapActions({
			createProduct: 'product/createProduct',
			editProductName: 'product/editProductName',
			editProductPrice: 'product/editProductPrice',
			editProductPayer: 'product/editProductPayer',
			toggleConsumer: 'product/toggleConsumer',
			toggleAllConsumers: 'product/toggleAllConsumers',
			removeProduct: 'product/removeProduct'
		}),
		add() {
			if (this.persons.length > 1) {
				this.createProduct()
				this.editPayer({
					id: this.products[0].id,
					payer: this.persons[0].id
				})
				nextTick(() => {
					const list = this.$el.querySelector('.list')
					list.scrollTop = 0
				})
			}
		},
		...mapMutations({
			editPayer: 'product/editPayer'
		}),
		focusInput() {
			this.$nextTick(() => {
				this.$refs.myInput.focus()
			})
		},
		handleNameChange(event, product) {
			this.editProductName({
				id: product.id,
				name: event.target.value
			})
			let index = product.id
			if (product.name === '') {
				if (!this.nameErrors.includes(index)) {
					this.nameErrors.push(index) // добавляем индекс клиента в массив ошибок
				}
			} else {
				this.nameErrors = this.nameErrors.filter(errorIndex => errorIndex !== index) // удаляем индекс клиента из массива ошибок
			}
		},
		handlePriceChange(event, product) {
			this.editProductPrice({
				id: product.id,
				price: +event.target.value
			})
			let index = product.id
			if (product.price === '') {
				if (!this.priceErrors.includes(index)) {
					this.priceErrors.push(index) // добавляем индекс клиента в массив ошибок
				}
			} else {
				this.priceErrors = this.priceErrors.filter(errorIndex => errorIndex !== index) // удаляем индекс клиента из массива ошибок
			}
		},
		goToResultsPage() {
			if (this.products.some(product => product.name === '')) {
				this.products.forEach(product => {
					if (product.name === '') {
						this.nameErrors.push(product.id)
					}
				})
			}
			if (this.products.some(product => product.price === '')) {
				this.products.forEach(product => {
					if (product.price === '') {
						this.priceErrors.push(product.id)
					}
				})
			}
			if (this.products.length < 1) {
				this.isDisabledNextBtn = true
				this.nextButtonText = 'Добавьте хотя бы один продукт'
				setTimeout(() => {
					this.isDisabledNextBtn = false
					this.nextButtonText = 'Перейти к результатам'
				}, 2000)
			} else if (this.nameErrors.length > 0) {
				setTimeout(() => {
					this.nameErrors = []
				}, 2000)
			}
			if (this.priceErrors.length > 0) {
				setTimeout(() => {
					this.priceErrors = []
				}, 2000)
			} else if (!this.nameErrors.length) {
				this.$router.push('/results')
			}
		}
	},
	mounted() {
		nextTick(() => {
			const list = this.$el.querySelector('.list')
			if (list) list.scrollTop = 0
		})
		this.products.forEach(product => {
			this.editPayer({
				id: product.id,
				payer: this.persons[0].id
			})
		})
	}
}
</script>

<style scoped lang="sass">
@import "@/styles/variables.sass"
.item
    display: flex
    .params
        width: 80%
    .name, .price
        flex: 1
        margin-right: 35px
        display: flex
        flex-direction: column
    .payer
        flex: 1
        display: flex
        .select
            border: 2px solid $color-text
            border-radius: 10px
            padding: 10px 15px
            box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2) inset
    .payer__icon
        margin-left: 10px
    .inp__icon
        display: flex
    .input
        margin: auto
        flex: 1
    .error-hint
        margin-top: 10px
    .remove__btn
        margin: auto
.top__params
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0px 20px
    margin-bottom: 10px
    .name
        display: flex
    .price
        display: flex

.consumers
    padding: 10px
    display: flex
    justify-content: flex-start
    overflow: auto
    .check__pers
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        width: 80px
        padding: 10px
        border-radius: 10px
        background-color: #e5d9b8
        margin-right: 10px
        border: 1px solid $color-text
        box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2)
        cursor: pointer
        .circle
            width: 50px
            height: 50px
            border-radius: 50%
            display: flex
            align-items: center
            justify-content: center
            color: white
    .avatar
        width: 50px
.not_selected
    background: $color-main
    transition: background-color 0.3s, color 0.3s
.selected
    background-color: $color-active
</style>

import { createStore } from 'vuex'
import { personModule } from '@/store/personModule'
import { productModule } from '@/store/productModule'

export default createStore({
	modules: {
		person: personModule,
		product: productModule
	}
})

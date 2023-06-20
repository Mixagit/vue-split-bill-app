<template>
    <div class="container">
        <h1 class="header">Результаты</h1>
        <div v-if="persons.length > 0" class="list">
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
import { mapState, mapMutations } from "vuex";
import ListComponent from "@/components/ListComponent.vue";

export default {
    components: { ListComponent },
    data() {
        return {
            nextButtonText: "Перейти к новому счёту",
            results: [],
        };
    },
    computed: {
        ...mapState({
            products: (state) => state.product.products,
            persons: (state) => state.person.persons,
        }),
    },
    methods: {
        getPersonName(id) {
            return this.persons.find((p) => p.id === id).name;
        },
        calculateTotalPersonEaten(personId) {
            let sum = 0;
            this.products.forEach((product) => {
                if (product.consumers.includes(personId)) {
                    sum += product.price / product.consumers.length;
                }
            });
            return sum;
        },
        calculateTotalPersonExpenses(personId) {
            let sum = 0;
            this.products.forEach((product) => {
                if (product.payer === personId) {
                    sum += product.price;
                }
            });
            return sum;
        },
        createQueues() {
            const debtorList = [];
            const owedList = [];

            this.persons.forEach((person) => {
                const totalExpenses = this.calculateTotalPersonExpenses(
                    person.id
                );
                const totalEaten = this.calculateTotalPersonEaten(person.id);
                if (totalExpenses > totalEaten) {
                    debtorList.push({
                        id: person.name,
                        balance: totalExpenses - totalEaten,
                    });
                } else if (totalEaten > totalExpenses) {
                    owedList.push({
                        id: person.name,
                        balance: totalEaten - totalExpenses,
                    });
                }
            });

            return { debtorList, owedList };
        },
        calcWhoOwesWhom() {
            const debtorList = [];
            const owedList = [];
            this.persons.forEach((person) => {
                const totalExpenses = this.calculateTotalPersonExpenses(
                    person.id
                );
                const totalEaten = this.calculateTotalPersonEaten(person.id);
                if (totalExpenses > totalEaten) {
                    debtorList.push({
                        id: person.id,
                        balance: totalExpenses - totalEaten,
                    });
                } else if (totalEaten > totalExpenses) {
                    owedList.push({
                        id: person.id,
                        balance: totalEaten - totalExpenses,
                    });
                }
            });

            while (debtorList.length > 0 || owedList.length > 0) {
                const owed = owedList[0];
                const debtor = debtorList[0];
                if (owed.balance < debtor.balance) {
                    this.results.push(
                        this.getPersonName(owed.id) +
                            " должен " +
                            this.getPersonName(debtor.id) +
                            " - " +
                            owed.balance
                    );
                    debtor.balance -= owed.balance;
                    owedList.shift();
                } else if (owed.balance > debtor.balance) {
                    this.results.push(
                        this.getPersonName(owed.id) +
                            " должен " +
                            this.getPersonName(debtor.id) +
                            " - " +
                            debtor.balance
                    );
                    owed.balance -= debtor.balance;
                    debtorList.shift();
                } else if (owed.balance === debtor.balance) {
                    this.results.push(
                        this.getPersonName(owed.id) +
                            " должен " +
                            this.getPersonName(debtor.id) +
                            " - " +
                            debtor.balance
                    );
                    owedList.shift();
                    debtorList.shift();
                }
            }
        },
        ...mapMutations({
            resetPersons: "person/resetPersons",
            resetProducts: "product/resetProducts",
        }),
        goToReload() {
            this.resetProducts();
            this.resetPersons();
            this.$router.push("/persons");
        },
    },
    mounted() {
        this.calcWhoOwesWhom();
    },
};
</script>

<style lang="sass"></style>

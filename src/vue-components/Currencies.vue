<template>

    <div class="grid grid-cols-1 gap-0 text-gray-400 text-center" v-if="currencies.length > 0">

        <div class="text-4xl py-4">
            {{ config.title }}
        </div>

        <div class="p-1" v-for="currency in currencies" :key="currency.code">
            <div class="text-xl">
                {{ currency.code }} {{ currency.rate }} {{ config.czk }}
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
    components: {
    },

    props: {
        currencies: {
            type: Object,
            default: {},
        },
        lang: {
            type: String,
            default: 'en',
        }
    },

    async setup(props, { emit }) {
        const route = useRoute();
        const apiUrl = route.meta.apiUrl;

        const lang = props.lang;
        let allCurrencies = props.currencies;
        const currencies = [];

        const config = {

            cs : {
                title: 'Kurzovní lístek',
                czk: 'Kč',
                currencies: ['EUR','USD','GBP','CHF','PLN',''],
            },

            en : {
                title: 'Exchange Rates',
                czk: 'CZK',
                currencies: ['EUR','USD','GBP','CHF','JPY'],
            },
        };

        for (let currency in allCurrencies) {

           // console.log(`Currency ${currency} in`, (config[lang].currencies).includes(currency))

            if ((config[lang].currencies).includes(currency)) {

                currencies.push(JSON.parse(JSON.stringify(allCurrencies[currency])));
            }
        }

        //console.log('Currency all', allCurrencies)
        console.log('Currency filtered', currencies)

        return {
            apiUrl,
            currencies,
            config: config[lang],
        };
    },
};
</script>

<style></style>
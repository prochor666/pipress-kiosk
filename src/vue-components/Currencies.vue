<template>

    <div class="text-gray-400 text-center" v-if="filtered.length > 0">

        <div class="text-4xl py-4 text-center">
            {{ config.title }}
        </div>

        <div class="grid grid-rows-3 grid-flow-col gap-0 text-center mx-auto" v-if="filtered.length > 0">

            <div class="py-2 px-6" v-for="currency, index in filtered" :key="currency.code">
                <!-- <div :class="[index < (filtered.length / 2) ? 'text-right': 'text-left', 'text-3xl grid grid-cols-2']"> -->
                <div class="text-2xl grid grid-cols-2">
                    <div class="text-right">
                        {{ currency.code }} ({{ currency.country }}):
                    </div>
                    <div class="text-emerald-400 text-left pl-6">
                        {{ currency.rate }} {{ config.czk }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import utils from '../composables/utils';

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
        const lang = props.lang;
        let currencies = props.currencies;
        const filtered = [];

        const config = {

            cs : {
                title: 'Kurzovní lístek',
                czk: 'Kč',
                currencies: ['EUR','USD','GBP','CHF','PLN','CAD'],
            },

            en : {
                title: 'Exchange Rates',
                czk: 'CZK',
                currencies: ['EUR','USD','GBP','CHF','JPY','CAD'],
            },
        };

        for (let currency of config[lang].currencies) {

            if (currencies.hasOwnProperty(currency)) {

                filtered.push(utils().copyData(currencies[currency]));
            }
        }

        //console.log(`Setting up currences`, filtered);

/*
        for (let currency in allCurrencies) {

           // console.log(`Currency ${currency} in`, (config[lang].currencies).includes(currency))

            if ((config[lang].currencies).includes(currency)) {

                currencies.push(utils().copyData(allCurrencies[currency]));
            }
        }
*/

        return {
            filtered,
            config: config[lang],
        };
    },
};
</script>

<style></style>
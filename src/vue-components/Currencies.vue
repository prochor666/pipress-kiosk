<template>

    <div class="text-gray-400 text-center" v-if="filtered.length > 0">

        <div class="text-xl md:text-4xl lg:text-4xl pt-6 md:pt-4 text-center">
            {{ config.title }}
        </div>

        <div class="grid grid-rows-4 grid-flow-col gap-1 md:gap-2 text-center mx-auto pt-3" v-if="filtered.length > 0">

            <div class="p-0" v-for="currency, index in filtered" :key="currency.code">
                <div class="text-sm md:text-2xl lg:text-3xl lg:leading-relaxed grid grid-cols-2 gap-0">
                    <div class="text-right">
                        {{ currency.amount }} {{ currency.code }}:
                    </div>
                    <div class="text-emerald-400 text-left pl-2">
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
    props: {
        currencies: {
            type: Object,
            default: {
                data: {},
                lang: 'en',
            },
        },
        lang: {
            type: String,
            default: 'en',
        }
    },

    async setup(props, { emit }) {
        const lang = props.lang;
        const currencies = props.currencies;
        const filtered = [];

        const config = {

            cs : {
                title: 'Kurzovní lístek',
                czk: 'Kč',
                currencies: ['EUR','USD','HRK','CHF','PLN','CAD','GBP','JPY'],
            },

            en : {
                title: 'Exchange Rates',
                czk: 'CZK',
                currencies: ['EUR','USD','HRK','CHF','JPY','CAD','GBP','JPY'],
            },
        };

        for (let currency of config[lang].currencies) {

            if (currencies.data.hasOwnProperty(currency)) {

                filtered.push(utils().copyData(currencies.data[currency]));
            }
        }

        console.table(filtered);

        return {
            filtered,
            config: config[lang],
        };
    },
};
</script>

<style></style>
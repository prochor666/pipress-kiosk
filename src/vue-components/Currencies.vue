<template>
    <div class="text-gray-400 text-center" v-if="filtered.length > 0">

        <div class="text-xl md:text-4xl lg:text-5xl py-6 md:py-10 lg:py-16 text-center uppercase">
            {{ config.title }}
        </div>

        <div class="text-left mx-auto grid grid-cols-2 gap-1 pl-2 md:pl-4 lg:pl-8" v-if="filtered.length > 0">

            <div class="px-px md:px-2" v-for="currency, index in filtered" :key="currency.code">
                <div class="text-lg md:text-3xl lg:text-4xl flex py-4 md:py-6 lg:py-10">
                    <div class="flex w-11 md:w-20 lg:w-24 text-center content-center">
                        <img :src="curencySvgMap[currency.code]" :alt="currency.code" class="w-[32px] md:w-[64px] lg-w-[96px] max-h-[26px] md:max-h-[40px] lg:max-h-[48px] mx-auto">
                    </div>
                    <div class="pl-px md:pl-4 lg:pl-6">
                        {{ currency.amount }} {{ currency.code }}:
                    </div>
                    <div class="text-emerald-400 text-left pl-1 md:ppl-4 lg:pl-6">
                        {{ currency.rate }} {{ config.targetCurrency }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import utils from '../composables/utils';

const props = defineProps({
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
});

const lang = props.lang;
const currencies = props.currencies;
const filtered = [];

const curencySvgMap = {
    EUR: 'svg/eu.svg',
    USD: 'svg/us.svg',
    NOK: 'svg/no.svg',
    CHF: 'svg/ch.svg',
    PLN: 'svg/pl.svg',
    CAD: 'svg/ca.svg',
    GBP: 'svg/gb.svg',
    JPY: 'svg/jp.svg',
}

const _config = {

    cs : {
        title: 'Kurzovní lístek',
        targetCurrency: 'Kč',
        currencies: ['EUR','USD','NOK','PLN','GBP', 'CHF', 'JPY', 'CAD'],
    },

    en : {
        title: 'Exchange Rates',
        targetCurrency: 'CZK',
        currencies: ['EUR','USD','NOK','PLN','GBP', 'CHF', 'JPY', 'CAD'],
    },
};

const config = _config[lang];

for (let currency of config.currencies) {
    if (currencies.data.hasOwnProperty(currency)) {
        filtered.push(utils().copyData(currencies.data[currency]));
    }
}
console.table(filtered);
</script>

<style></style>

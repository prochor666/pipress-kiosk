<template>
    <div class="text-gray-400 text-center" v-if="weather.main">

        <div class="text-xl md:text-4xl lg:text-5xl py-6 md:py-10 lg:py-16 text-center uppercase">
            {{ config.title }}
        </div>

        <div class="text-left mx-auto grid grid-cols-2 gap-1">

            <div class="px-2 -mb-4 md:-mb-8 lg:-mb-12">
                <div class="text-xl md:text-3xl lg:text-5xl flex pt-2 md:pt-4 pb-0">
                    <div class="flex-none w-12 md:w-20 lg:w-32 text-center bg-gray-700x">
                        <img :src="`${local_url}/${weather.weather[0].icon}.svg`" class="-mt-2 md:-mt-4 lg:-mt-8 w-[72px] md:w-[96px] lg:w-[116px] inline" />
                    </div>
                    <div class="pl-2 capitalize">
                        {{ weather.weather[0].description }}
                    </div>
                </div>
            </div>

            <div class="px-2">
                <div class="text-xl md:text-3xl lg:text-4xl flex py-2 md:py-4 lg:py-6">
                    <div class="flex-none w-10 md:w-20 lg:w-32 text-center">
                        <MdiThermometerLines class="w-6 h-6 md:w-8 md:h-8 lg:w-14 lg:h-14 mx-auto -mt-px md:-mt-0.5 lg:-mt-1 inline" />
                    </div>
                    <div class="pl-2 capitalize">
                        {{ config.temp }}:
                    </div>
                    <div class="text-left text-emerald-400 text-left pl-2">
                        {{ Math.round(weather.main.temp) }} <span v-html="config.tempUnit"></span>
                    </div>
                </div>
            </div>

            <div class="px-2">
                <div class="text-xl md:text-3xl lg:text-4xl flex py-2 md:py-4 lg:py-6">
                    <div class="flex-none w-10 md:w-20 lg:w-32 text-center">
                        <MdiThermometerWater class="w-6 h-6 md:w-8 md:h-8 lg:w-14 lg:h-14 mx-auto -mt-px md:-mt-0.5 lg:-mt-1 inline" />
                    </div>
                    <div class="pl-2 capitalize">
                        {{ config.feels_like }}:
                    </div>
                    <div class="text-left text-emerald-400 text-left pl-2">
                        {{ Math.round(weather.main.feels_like) }} <span v-html="config.tempUnit"></span>
                    </div>
                </div>
            </div>

            <div class="px-2">
                <div class="text-xl md:text-3xl lg:text-4xl flex py-2 md:py-4 lg:py-6">
                    <div class="flex-none w-10 md:w-20 lg:w-32 text-center">
                        <MdiWeatherWindy class="w-6 h-6 md:w-8 md:h-8 lg:w-14 lg:h-14 mx-auto -mt-px md:-mt-0.5 lg:-mt-1 inline" />
                    </div>
                    <div class="pl-2 capitalize">
                        {{ config.wind }}:
                    </div>
                    <div class="text-left text-emerald-400 text-left pl-2">
                        {{ weather.wind.speed }} {{ config.windUnit }}
                    </div>
                </div>
            </div>

            <div class="px-2">
                <div class="text-xl md:text-3xl lg:text-4xl flex py-2 py-2 md:py-4 lg:py-6">
                    <div class="flex-none w-10 md:w-20 lg:w-32 text-center">
                        <MdiSpeedometer class="w-6 h-6 md:w-8 md:h-8 lg:w-14 lg:h-14 mx-auto -mt-px md:-mt-0.5 lg:-mt-1 inline" />
                    </div>
                    <div class="pl-2 capitalize">
                        {{ config.pressure }}:
                    </div>
                    <div class="text-left text-emerald-400 text-left pl-2">
                        {{ weather.main.pressure }} {{ config.pressureUnit }}
                    </div>
                </div>
            </div>

            <div class="px-2">
                <div class="text-xl md:text-3xl lg:text-4xl flex py-2 md:py-4 lg:py-6">
                    <div class="flex-none w-10 md:w-20 lg:w-32 text-center">
                        <MdiWater class="w-6 h-6 md:w-8 md:h-8 lg:w-14 lg:h-14 mx-auto -mt-px md:-mt-0.5 lg:-mt-1 inline" />
                    </div>
                    <div class="pl-2 capitalize">
                        {{ config.humidity }}:
                    </div>
                    <div class="text-left text-emerald-400 text-left pl-2">
                        {{ weather.main.humidity }} %
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import utils from '../composables/utils';
import { MdiThermometerLines, MdiThermometerWater, MdiWeatherWindy, MdiWater, MdiSpeedometer } from 'materialdesignicons-vue3/icons/';

const props = defineProps({
    weather: {
        type: Object,
        default: {},
    },
    lang: {
        type: String,
        default: 'en',
    },
    units: {
        type: String,
        default: 'imperial',
    }
});

const weather = props.weather;
const lang = props.lang;
const units = props.units;
const local_url = 'weather_icons';

const getUnits = function (units, key) {

    const src = {
        imperial: {
            temp: '&deg;F',
            pressure: 'hPa',
            windSpeed: 'mph',
        },
        metric: {
            temp: '&deg;C',
            pressure: 'hPa',
            windSpeed: 'm/s',
        }
    }

    return src[units][key];
}


const _config = {
    cs : {
        title: 'Počasí',
        weatherUrlFix: 'cz',
        units: units,
        temp: 'Teplota',
        feels_like: 'Pocitová',
        pressure: 'Tlak',
        humidity: 'Vlhkost',
        wind: 'Vítr',
        clouds: 'Oblačnost',
        tempUnit: getUnits(units, 'temp'),
        pressureUnit: getUnits(units, 'pressure'),
        windUnit: getUnits(units, 'windSpeed'),
    },

    en : {
        title: 'Weather',
        weatherUrlFix: 'en',
        units: units,
        temp: 'Temperature',
        feels_like: 'Feels like',
        pressure: 'Pressure',
        humidity: 'Humidity',
        wind: 'Vind speed',
        clouds: 'Clouds',
        tempUnit: getUnits(units, 'temp'),
        pressureUnit: getUnits(units, 'pressure'),
        windUnit: getUnits(units, 'windSpeed'),
    },
};

const config = _config[lang];
</script>

<style></style>

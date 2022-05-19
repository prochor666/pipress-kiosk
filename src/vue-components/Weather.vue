<template>
    <div class="text-gray-400 w-full min-h-full flex flex-col justify-center content-center" v-if="weather.main">

        <div class="text-center">

            <div class="inline-block text-4xl">
                {{ config.title }}
            </div>

            <div class="text-3xl pt-3 pb-1">
                {{ config.temp }}: {{ Math.round(weather.main.temp) }} <span v-html="config.tempUnit"></span>
                <span :style="`color: ${getRandomColor()}`" class="ml-3 mr-2 inline-block h-10">&bull;</span>
                {{ config.feels_like }}: {{ Math.round(weather.main.feels_like) }} <span v-html="config.tempUnit"></span>
            </div>

            <div class="text-3xl">
                <div class="inline-block h-10 py-2">
                    <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`" class="-mt-2 inline" />
                    <span class="capitalize inline-block h-10 font-medium">{{ weather.weather[0].description }}</span>
                    <span :style="`color: ${getRandomColor()}`" class="mx-3 inline-block h-10">&bull;</span>
                    {{ config.wind }}: {{ weather.wind.speed }} {{ config.windUnit }}
                </div>
            </div>

            <div class="text-3xl pt-3">
                {{ config.pressure }}: {{ weather.main.pressure }} {{ config.pressureUnit }}
                <span :style="`color: ${getRandomColor()}`" class="mx-3 inline-block h-10">&bull;</span>
                {{ config.humidity }}: {{ weather.main.humidity }} %
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
        weather: {
            type: Object,
            default: {},
        },
        lang: {
            type: String,
            default: 'en',
        }
    },

    async setup(props, { emit }) {
        const weather = props.weather;
        const lang = props.lang;

        const config = {
            cs : {
                title: 'Počasí',
                weatherUrlFix: 'cz',
                units: 'metric',
                temp: 'Teplota',
                feels_like: 'Pocitová',
                pressure: 'Tlak',
                humidity: 'Vlhkost',
                wind: 'Vítr',
                clouds: 'Oblačnost',
                tempUnit: '&deg;C',
                pressureUnit: 'hPa',
                windUnit: 'm/s',
            },

            en : {
                title: 'Weather',
                weatherUrlFix: 'en',
                units: 'imperial',
                temp: 'Temperature',
                feels_like: 'Feels like',
                pressure: 'Pressure',
                humidity: 'Humidity',
                wind: 'Vind speed',
                clouds: 'Clouds',
                tempUnit: '&deg;F',
                pressureUnit: 'hPa',
                windUnit: 'mph',
            },
        };



        return {
            weather,
            config: config[lang],
            getRandomColor: utils().getRandomColor,
        };
    },
};
</script>

<style></style>
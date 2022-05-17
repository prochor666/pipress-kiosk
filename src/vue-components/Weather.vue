<template>
    <div class="text-gray-400 w-full min-h-full flex flex-col justify-center content-center" v-if="weather.main">

        <div class="text-center">

            <div class="inline-block text-4xl">
                {{ config.title }}
            </div>

            <div class="text-3xl pt-3 pb-1">
                {{ weather.main.temp }} <span v-html="config.tempUnit"></span> / {{ weather.main.feels_like }} <span v-html="config.tempUnit"></span>
            </div>

            <div class="capitalize text-3xl">
                <div class="inline-block h-10 py-2">
                    <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`" class="-mt-3 inline" /> <span class="inline-block h-10">{{ weather.weather[0].description }}</span>
                </div>
            </div>

            <div class="text-3xl pt-3">
                {{ config.pressure }}: {{ weather.main.pressure }} {{ config.pressureUnit }}
                <span :style="`color: ${getRandomColor()}`">&bull;</span>
                {{ config.humidity }}: {{ weather.main.humidity }} %
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
        const route = useRoute();
        const apiUrl = route.meta.apiUrl;
        const weather = props.weather;
        const lang = props.lang;

        const config = {
            cs : {
                title: 'Počasí',
                weatherUrlFix: 'cz',
                units: 'metric',
                temp: 'Teplota',
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
                pressure: 'Pressure',
                humidity: 'Humidity',
                wind: 'Vind speed',
                clouds: 'Clouds',
                tempUnit: '&deg;F',
                pressureUnit: 'hPa',
                windUnit: 'mph',
            },
        };

        const getRandomColor = function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        return {
            apiUrl,
            weather,
            config: config[lang],
            getRandomColor,
        };
    },
};
</script>

<style></style>
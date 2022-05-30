<template>
    <div class="text-gray-400 w-full min-h-full flex flex-col justify-center content-center" v-if="weather.main">

        <div class="text-center">

            <div class="inline-block text-xl md:text-4xl lg:text-4xl pt-2 md:pt-0 md:pb-2">
                {{ config.title }}
            </div>

            <div class="text-lg md:text-3xl lg:text-4xl pt-3">
                {{ config.temp }}: {{ Math.round(weather.main.temp) }} <span v-html="config.tempUnit"></span>
                <span :style="`color: ${getRandomColor()}`" class="ml-3 mr-2 inline-block h-8 md:h-10">&bull;</span>
                {{ config.feels_like }}: {{ Math.round(weather.main.feels_like) }} <span v-html="config.tempUnit"></span>
            </div>

            <div class="text-lg md:text-3xl lg:text-4xl md:my-1 lg:mt-4">
                <div class="flex justify-center h-8 md:h-10 lg:h-14">
                    <img :src="`${local_url}/${weather.weather[0].icon}.svg`" class="lg:-mt-1 inline h-8 md:h-10 lg:h-14" />
                    <span class="inline-block h-8 md:h-10 lg:h-14 font-medium">{{ weather.weather[0].description }}</span>
                    <span :style="`color: ${getRandomColor()}`" class="mx-3 inline-block h-8 md:h-10 lg:h-14">&bull;</span>
                    <span class="h-8 md:h-10 lg:h-14">{{ config.wind }}: {{ weather.wind.speed }} {{ config.windUnit }}</span>
                </div>
            </div>

            <div class="text-lg md:text-3xl lg:text-4xl">
                {{ config.pressure }}: {{ weather.main.pressure }} {{ config.pressureUnit }}
                <span :style="`color: ${getRandomColor()}`" class="mx-3 inline-block h-8 md:h-10">&bull;</span>
                {{ config.humidity }}: {{ weather.main.humidity }} %
            </div>

        </div>
    </div>
</template>

<script>
import utils from '../composables/utils';

export default {
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
        const local_url = 'weather_icons';

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
            local_url,
        };
    },
};
</script>

<style></style>
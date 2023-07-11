
<template>
    <div class="text-gray-400 w-full min-h-full flex flex-col justify-center content-center transition-all ease-in-out duration-300">
        <div class="text-4xl md:text-7xl lg:text-9xl text-center">
            <div class="inline-block p-1 md:p-2 lg:p-3 w-14 md:w-20 lg:w-40 text-center">{{ clock.hours }}</div>
            <div class="inline-block p-1 md:p-2 lg:p-3 w-4 md:w-8 lg:w-14 text-center">:</div>
            <div class="inline-block p-1 md:p-2 lg:p-3 w-14 md:w-20 lg:w-40 text-center">{{ clock.minutes }}</div>
            <div class="inline-block p-1 md:p-2 lg:p-3 w-4 md:w-8 lg:w-14 text-center">:</div>
            <div class="inline-block p-1 md:p-2 lg:p-3 w-14 md:w-20 lg:w-40 text-center">{{ clock.seconds }}</div>
        </div>
        <div class="text-2xl md:text-5xl lg:text-6xl font-medium text-center">
            <div class="inline-block pt-2 md:pt-8 lg:pt-12 mx-auto">
                {{ clock.dayOfWeek }}, {{ clock.day }}. {{ clock.month }}
            </div>
            <!-- <div class="block mx-auto text-base">
                <span class="text-amber-400">Screen size: {{ scr.w }}x{{ scr.h }}</span> ---
                <span class="text-rose-400">Screen avail size: {{ scr.aw }}x{{ scr.ah }}</span>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
    lang: {
        type: String,
        default: 'en',
    },
    geo: {
        type: Object,
        default: {
            ip: '',
            city: '',
            location: {
                time_zone: ''
            },
        },
    },
});

const lang = props.lang;
const geo = props.geo;

const config = {
    cs : {
        days: ['Neděle','Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
        months: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
    },

    en : {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    },
};

const scr = reactive({
    w: window.screen.width,
    h: window.screen.height,
    aw: window.screen.availWidth,
    ah: window.screen.availHeight,
});

const clock = reactive({
    hours: 0,
    minutes: 0,
    seconds: 0,
    month: '',
    day: '',
    dayOfWeek: '',
});

const setClock = () => {
    const date = new Date();
    let _hours = date.getHours();
    let _minutes = date.getMinutes();
    let _seconds = date.getSeconds();
    let _month = date.getMonth();
    let _day = date.getDate();
    let _dayOfWeek = date.getDay();
    clock.hours = _hours <= 9 ? `${_hours}`.padStart(2, 0) : _hours;
    clock.minutes = _minutes <= 9 ? `${_minutes}`.padStart(2, 0) : _minutes;
    clock.seconds = _seconds <= 9 ? `${_seconds}`.padStart(2, 0) : _seconds;
    clock.month = config[lang].months[_month];
    clock.day = _day;
    clock.dayOfWeek = config[lang].days[_dayOfWeek];
}

setInterval(() => setClock(), 1000);
</script>

<style></style>

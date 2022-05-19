
<template>
    <div class="text-gray-400 w-full min-h-full flex flex-col justify-center content-center">

        <div class="text-5xl text-center pt-4">
            <div class="inline-block p-1 w-16 text-center">{{ clock.hours }}</div>
            <div class="inline-block p-1 w-4 text-center">:</div>
            <div class="inline-block p-1 w-16 text-center">{{ clock.minutes }}</div>
            <div class="inline-block p-1 w-4 text-center">:</div>
            <div class="inline-block p-1 w-16 text-center">{{ clock.seconds }}</div>
        </div>

        <div class="text-3xl font-medium text-center">
            <div class="inline-block pt-2 mx-auto">
                {{ clock.dayOfWeek }}, {{ clock.day }}. {{ clock.month }}
            </div>
        </div>

        <div class="text-2xl font-medium text-center">
            <div class="inline-block py-3 mx-auto">
                {{ geo.city }}, {{ geo.location.time_zone }}
            </div>
        </div>

    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    props: {
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
    },

    async setup(props) {

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

        return {
            clock,
            geo,
            config: config[lang],
        }
    },
};
</script>

<style></style>
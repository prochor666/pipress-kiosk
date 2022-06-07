<template>

    <!-- cursor-none -->
    <main class="p-0 m-0 text-center h-screen max-h-screen">

        <div class="w-screen h-screen max-h-screen min-h-screen font-sans text-base fixed z-1000" v-if="activity.active === false">
                <Black />
        </div>

        <div class="w-full h-screen max-h-screen min-h-screen font-sans text-base">

            <Indicator :beacon="beacon" :offline="data.offline" :key="hashes.offline" />

            <div class="p-0 h-[10%]">
                <Clock :lang="data.lang" :geo="data.rest.geo.geoip" :key="hashes.clock" />
            </div>

            <div class="p-0 h-[15%]" v-if="data.offline === false">
                <Weather :weather="data.weather" :lang="data.lang" :units="data.units" :key="hashes.weather" />
            </div>

            <div class="p-0 h-[20%]" v-if="data.offline === false">
                <Currencies :currencies="data.currencies" :lang="data.lang" :key="hashes.currencies" />
            </div>

            <div class="p-0 h-[55%]" v-if="data.offline === false && data.media.files.length > 0">
                <Media :media="data.media" :lang="data.lang" :key="hashes.media" />
            </div>

            <div class="p-0 h-[55%]" v-if="data.offline === true || data.media.files.length === 0">
                <Offline />
            </div>

        </div>

    </main>

</template>

<script>
document.documentElement.classList.add('vertical');


import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import Indicator from './Indicator.vue';
import Black from './Black.vue';
import Offline from './Offline.vue';
import Media from './Media.vue';
import Clock from '../vue-components/Clock.vue';
import Currencies from '../vue-components/Currencies.vue';
import Weather from '../vue-components/Weather.vue';
import apiWorker from '../api.worker.js?worker';
import activityWorker from '../activity.worker.js?worker';
import objectHash from 'object-hash';
import utils from '../composables/utils';

const svc = new apiWorker();
const asvc = new activityWorker();

export default {
    components: {
        Indicator,
        Clock,
        Currencies,
        Media,
        Weather,
        Offline,
        Black,
    },

    async setup() {
        const route = useRoute();
        const apiUrl = '';
        const appPrefix = 'pipress';
        const beacon = reactive({
            loading: false,
            key: utils().getRndKey(),
            ip: '',
        });

        // Initialize worker
        svc.postMessage(apiUrl);
        asvc.postMessage(apiUrl);

        const activity = reactive({
            active: false
        });


        const data = reactive({
            clock: { ready: false },
            media: {
                url: '',
                files: [],
            },
            currencies: {
                data: {},
                lang: 'en',
            },
            weather: {},
            index: 0,
            video: '',
            rest: {
                geo: {
                    geoip: {
                        ip: '',
                        city: '',
                        location: {
                            time_zone: '',
                        },
                    },
                },
            },
            lang: 'en',
            units: 'imperial',
            offline: false,
        });


        const hashes = {
            clock: objectHash(data.clock),
            currencies: objectHash(data.currencies),
            weather: objectHash(data.weather),
            media: objectHash(data.media),
            offline: objectHash(data.offline),
        };


        const detectChanges = async (hashes, data) => {

            let changed = false;

            for(let i in hashes) {

                let newHash = objectHash(data[i]),
                    oldHash = utils().keeper(`${appPrefix}.${i}Hash`);

                if (newHash !== oldHash) {

                    hashes[i] = newHash;
                    //console.log(`Saving new hash ${i}`, hashes[i]);
                    utils().keeper(`${appPrefix}.${i}Hash`, hashes[i]);
                    changed = true;
                }
            }

            return changed;
        }


        const update = async (preflightData) => {

            for (let i in preflightData) {

                data[i] = preflightData[i];
            }
        }


        // R
        await detectChanges(hashes, data);

        svc.onmessage = async (e) => {

            const preflightData = await e.data,
                  resultChange = await detectChanges(hashes, preflightData);

            await update(preflightData);

            setTimeout( async function(){

                beacon.loading = true;
                beacon.key = utils().getRndKey();

                await svc.postMessage(apiUrl);

                setTimeout(() => {
                    beacon.loading = false;
                    beacon.key = utils().getRndKey();
                }, 3000);
            }, 20000);
        }


        asvc.onmessage = async (e) => {

            const preflightData = await e.data;

            activity.active = preflightData.active || false;

            const timeout = activity.active === true ? 60000: 2000;
            //console.log(activity.active, timeout);

            setTimeout( async function(){

                await asvc.postMessage(apiUrl);

            }, timeout);
        }


        return {
            data,
            activity,
            beacon,
            hashes,
        };
    },
};
</script>

<style></style>
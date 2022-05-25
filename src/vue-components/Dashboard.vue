<template>

    <!-- cursor-none -->
    <main class="p-0 m-0 ">

        <div class="w-screen h-screen max-h-screen min-h-screen font-sans">

            <Indicator :beacon="beacon" :key="beacon.key" />

            <div class="p-0 h-[8%]">
                <Clock :lang="data.lang" :geo="data.rest.geo.geoip" :key="hashes.clock" />
            </div>

            <div class="p-0 h-[17%]">
                <Weather :weather="data.weather" :lang="data.lang" :key="hashes.weather" />
            </div>

            <div class="p-0 h-[60%]" v-if="data.media.files.length > 0">
                <Media :media="data.media" :lang="data.lang" :key="hashes.media" />
            </div>

            <div class="p-0 h-[60%]" v-if="data.media.files.length === 0">
                <Offline />
            </div>

            <div class="p-0 h-[15%]">
                <Currencies :currencies="data.currencies" :lang="data.lang" :key="hashes.currencies" />
            </div>

        </div>
    </main>

</template>

<script>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import Indicator from './Indicator.vue';
import Offline from './Offline.vue';
import Media from './Media.vue';
import Clock from '../vue-components/Clock.vue';
import Currencies from '../vue-components/Currencies.vue';
import Weather from '../vue-components/Weather.vue';
import apiWorker from '../api.worker.js?worker';
import objectHash from 'object-hash';
import utils from '../composables/utils';

const svc = new apiWorker();

export default {
    components: {
        Indicator,
        Clock,
        Currencies,
        Media,
        Weather,
        Offline,
    },

    async setup() {
        const route = useRoute();
        const apiUrl = route.meta.apiUrl;
        const appPrefix = route.meta.appPrefix;
        const beacon = reactive({
            loading: false,
            key: utils().getRndKey(),
            ip: '',
        });

        const offline = true;

        // Initialize worker
        svc.postMessage(apiUrl);

        const data = reactive({
            clock: { ready: false },
            media: {
                url: '',
                files: [],
            },
            currencies: {},
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
        });

        const hashes = {
            clock: objectHash(data.clock),
            currencies: objectHash(data.currencies),
            weather: objectHash(data.weather),
            media: objectHash(data.media),
        };

        const detectChanges = async (hashes, data) => {

            let changed = false;

            for(let i in hashes) {

                let newHash = objectHash(data[i]),
                    oldHash = utils().keeper(`${appPrefix}.${i}Hash`);

                if (newHash !== oldHash) {

                    hashes[i] = newHash;
                    console.log(`Saving new hash ${i}`, hashes[i]);
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
            //console.log('Worker used', data);
        }


        // R
        await detectChanges(hashes, data);

        svc.onmessage = async (e) => {

            const preflightData = await e.data,
                  resultChange = await detectChanges(hashes, preflightData);

            if (resultChange === true) {

                await update(preflightData);
            }

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

        return {
            data,
            beacon,
            hashes,
            offline,
        };
    },
};
</script>

<style></style>
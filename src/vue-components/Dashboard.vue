<template>

    <!-- cursor-none -->
    <main class="p-0 m-0 ">

        <div class="w-screen h-screen max-h-screen min-h-screen font-sans">

            <div class="p-0 h-[20%]">

                <Currencies :currencies="data.currencies" :lang="data.lang" :key="hashes.currencies" />
            </div>

            <div class="p-0 h-[20%]">

                <Weather :weather="data.weather" :lang="data.lang" :key="hashes.weather" />
            </div>
            <div class="p-0 h-[60%]">

                <VideoPlayer :media="data.media" :lang="data.lang" :key="hashes.media" />
            </div>

        </div>
    </main>

</template>

<script>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import useApi from '../composables/use-api.js';
import VideoPlayer from '../vue-components/VideoPlayer.vue';
import Currencies from '../vue-components/Currencies.vue';
import Weather from '../vue-components/Weather.vue';
import apiWorker from '../api.worker.js?worker';
import objectHash from 'object-hash';

const svc = new apiWorker();

export default {
    components: {
        Currencies,
        VideoPlayer,
        Weather,
    },

    methods: {


    },

    async setup() {
        const route = useRoute();
        const apiUrl = route.meta.apiUrl;

        // Initialize worker
        svc.postMessage(apiUrl);

        const detectChanges = async (data) => {

            let changed = false;

            for(let i in hashes) {

                let newHash = objectHash(data[i]),
                    oldHash = localStorage.getItem(`${i}Hash`);

                //console.log('Detecting data', newHash, oldHash, data[i]);

                if (newHash !== oldHash) {

                    hashes[i] = newHash;
                    console.log(`Saving new hash ${i}`, hashes[i]);
                    localStorage.setItem(`${i}Hash`, hashes[i]);
                    changed = true;
                }
            }

            return changed;
        }

        const data = reactive({
            media: [],
            currencies: {},
            weather: {},
            index: 0,
            video: '',
            rest: {},
            lang: 'en',
        });

        const update = async (preflightData) => {

            for (let i in preflightData) {

                data[i] = preflightData[i];
            }
            console.log('Worker used', data);
        }

        const hashes = {
            currencies: objectHash(data.currencies),
            weather: objectHash(data.weather),
            media: objectHash(data.media),
        };
        await detectChanges(data);

        svc.onmessage = async (e) => {

            const preflightData = await e.data,
                  resultChange = await detectChanges(preflightData);

            if (resultChange === true) {

                await update(preflightData);
                //console.log('Worker used', data);
            }

            setTimeout( function(){
                svc.postMessage(apiUrl)
            }, 10000);
        }

        return {
            data,
            hashes,
        };
    },
};
</script>

<style></style>
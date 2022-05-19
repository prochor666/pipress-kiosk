
<template>
    <span v-if="beacon.loading === true">
        <!-- <span class="absolute right-12 top-8 text-sky-600 ">{{ beacon.ip }}</span> -->
        <!-- <span class="absolute right-8 top-8 inline-flex h-1 w-1 rounded-full bg-sky-800"></span> -->
        <span class="animate-ping duration-1000 absolute right-8 top-8 inline-flex h-8 w-8 rounded-full bg-sky-600 opacity-75"></span>
        <span class="absolute right-8 top-8 w-8 h-8 text-sky-600">
            <WifiIcon class="w-8 h-8" />
        </span>
    </span>
</template>

<script>
import {
    CloudDownloadIcon,
    WifiIcon,
} from '@heroicons/vue/outline';

export default {

    components: {
        CloudDownloadIcon,
        WifiIcon,
    },

    props: {
        beacon: {
            type: Object,
            default: {
                loading: false,
                ip: '',
                key: '',
            },
        },
    },

    async setup(props) {

        const beacon = props.beacon;

        return {
            beacon,
        }
    },
};
</script>

<style></style>
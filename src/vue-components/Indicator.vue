
<template>
    <span v-if="beacon.loading === true">
        <!-- <span class="absolute right-12 top-4 text-sky-600 ">{{ beacon.ip }}</span> -->
        <span class="animate-ping duration-1000 absolute right-4 top-4 inline-flex h-4 w-4 rounded-full bg-sky-600 opacity-75"></span>
        <span class="absolute right-4 top-4 w-4 h-4 text-sky-600">
            <WifiIcon class="w-4 h-4" />
        </span>
    </span>

    <span v-if="offline === true && beacon.loading === false">
        <span class="absolute right-4 top-4 w-4 h-4 text-red-600">
            <StatusOfflineIcon class="w-4 h-4" />
        </span>
    </span>
</template>

<script>
import {
    CloudDownloadIcon,
    StatusOfflineIcon,
    WifiIcon,
} from '@heroicons/vue/outline';

export default {

    components: {
        CloudDownloadIcon,
        StatusOfflineIcon,
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
        offline: {
            type: Boolean,
            default: true,
        }
    },

    async setup(props) {

        const beacon = props.beacon;
        const offline = props.offline;

        return {
            beacon,
            offline,
        }
    },
};
</script>

<style></style>
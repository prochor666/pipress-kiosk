
<template>
    <span v-if="beacon.loading === true">
        <span class="animate-ping duration-1000 absolute right-6 top-4 inline-flex h-4 w-4 rounded-full bg-sky-600 opacity-75"></span>
        <span class="absolute right-6 top-4 w-4 h-4 text-sky-600">
            <MdiWifi class="w-4 h-4" />
        </span>
    </span>

    <span v-if="offline === true && beacon.loading === false">
        <span class="absolute right-6 top-4 w-4 h-4 text-red-600">
            <MdiWifiOff class="w-4 h-4" />
        </span>
    </span>
</template>

<script setup>
import {
    MdiWifiOff,
    MdiWifi,
} from 'materialdesignicons-vue3/icons/';

const props = defineProps({
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
});

const beacon = props.beacon;
const offline = props.offline;
</script>

<style></style>

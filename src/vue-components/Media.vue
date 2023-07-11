<template>
    <div class="pt-4 pb-2 text-center flex h-fit min-h-full max-h-full max-w-screen aspect-video" v-if="type === 'video' && enabled === true">
        <video :src="`${local_url}/${current}`" controls @ended="nextItem()" :key="current" muted autoplay class="mx-auto grow h-100 animate-fadein aspect-video"></video>
    </div>
    <div class="pt-4 pb-2 text-center h-full min-h-full max-h-full max-w-screen" v-if="type === 'image' && enabled === true">
        <img :src="`${local_url}/${current}`" @load="waitForStatic()" :key="current" class="mx-auto object-contain max-h-full max-w-screen animate-fadein">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import utils from '../composables/utils';

const props = defineProps({
    media: {
        type: Object,
        default: {
            url: '',
            files: [],
        },
    },
    lang: {
        type: String,
        default: 'en',
    }
});

const media = props.media;
const index = ref(0);
const current = props.media.files.length > 0 ? ref(media.files[0].basename): ref('');
const local_url = 'media';
const enabled = media.files.length > 0;

const waitForStatic = function() {
    setTimeout(() => nextItem(), 5000);
};

const nextItem = function () {
    const max = media.files.length - 1;
    index.value = index.value + 1 <= max ? index.value + 1: 0;
    current.value = media.files[index.value].basename;
    type.value = chooseType(current.value);
    /* console.log(`Next media item ${current.value}`); */
};

const chooseType = function (filename)
{
    const mediaType = utils().fileExtension(filename).toLowerCase();
    if (['mp4','m4v'].includes(mediaType)) {
        return 'video';
    }

    if (['jpg', 'png', 'gif'].includes(mediaType)) {
        return 'image';
    }

    return 'none';
};

const type = ref(chooseType(current.value));
console.log(`Current video ${local_url}/${current.value}`);
</script>

<style></style>

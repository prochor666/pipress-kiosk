<template>
    <div class="p-1 text-center flex h-full min-h-full max-h-full">
        <video :src="video" ref="videoPlayer" @ended="nextVideo()" :key="video" muted autoplay class="mx-auto grow"></video>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    components: {
    },

    props: {
        media: {
            type: Object,
            default: [],
        },
        lang: {
            type: String,
            default: 'en',
        }
    },

    async setup(props, { emit }) {
        const media = props.media;
        const index = ref(0);
        const video = ref(media[0]);

        const nextVideo = function () {

            const max = media.length - 1;
            index.value = index.value + 1 <= max ? index.value + 1: 0;
            video.value = media[index.value];
            console.log(`Next video ${video.value}`);
        };

        console.log(`Current video ${video.value}`, media);

        return {
            nextVideo,
            video,
        };
    },
};
</script>

<style></style>
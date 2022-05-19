<template>
    <div class="py-2 text-center flex h-full min-h-full max-h-full" v-if="type === 'video'">
        <video :src="current" @ended="nextItem()" :key="current" muted autoplay class="mx-auto grow animate-fadein"></video>
    </div>
    <div class="py-2 text-center h-full min-h-full max-h-full" v-if="type === 'image'">
        <img :src="current" @load="waitForStatic()" :key="current" class="mx-auto object-contain max-h-full animate-fadein">
    </div>
</template>

<script>
import { ref } from 'vue';
import utils from '../composables/utils';

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
        const current = ref(media[0]);

        const waitForStatic = function() {

            setTimeout(() => nextItem(), 5000);
        };


        const nextItem = function () {

            const max = media.length - 1;
            index.value = index.value + 1 <= max ? index.value + 1: 0;
            current.value = media[index.value];
            type.value = chooseType(current.value);
            console.log(`Next media item ${current.value}`);
        };


        const chooseType = function (filename)
        {
            const mediaType = utils().fileExtension(filename).toLowerCase();

            if (['mp4','m4v'].includes(mediaType)) {

                return 'video';
            }

            if (['jpg','png', 'gif'].includes(mediaType)) {

                return 'image';
            }

            return 'none';
        };

        const type = ref(chooseType(current.value));
        console.log(`Current video ${current.value}`, media);

        return {
            nextItem,
            waitForStatic,
            current,
            type,
        };
    },
};
</script>

<style></style>
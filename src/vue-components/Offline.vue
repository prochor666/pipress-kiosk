<template>
    <div class="py-2 text-center flex h-full min-h-full max-h-full" v-if="enabled === true">
        <video :src="`${local_url}/${current}`" :key="current" muted loop autoplay class="mx-auto grow animate-fadein"></video>
    </div>

</template>

<script setup>
const current = 'default.mp4';
const local_url = 'offline';
const enabled = true;
</script>

<style></style>

<template>
    <div class="dialog" v-if="show===true" @click="hideDialog">
        <div @click.stop class="dialog_content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMixins from '@/mixins/toggleMixins';

    export default {
        name: "my-dialog",
        mixins: [toggleMixins]
    }
</script>

<style scoped>
    .dialog {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0, 0.5);
        display: flex;
        position: fixed;
    }

    .dialog_content {
        margin: auto;
        border-radius: 12px;
        background: white;
        min-width: 300px;
        min-height: 50px;
        padding: 20px;
    }
</style>
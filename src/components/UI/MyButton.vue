<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'my-button'
    }
</script>

<style scoped>
    .button {
        padding: 10px 15px;
        background: none;
        color:rgb(20, 76, 164);
        background-color: rgb(231, 238, 241);
        border: none;
        cursor: pointer;
        border-radius: 5px;

    }
</style>
<template>
    <select @change="changeOptions" class="select">
        <option disabled value="">Выберите из списка</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
</template>

<script>
    export default {
        name: "my-select",
        props: {
            modelValue: {
                type: String,
            },
            options: {
                type: Array,
                default: () => []
            },
        }
    ,
    methods: {
        changeOptions (event) {
            this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
    .select {
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
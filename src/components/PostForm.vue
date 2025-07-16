<template>
    <div>
        <form @submit.prevent>
        <h3>Создание поста</h3>
        <my-input 
            v-focus
            v-model="post.title"
            type="text" 
            placeholder="Название поста"/>
        <my-input  
            v-model="post.body"
            type="text" 
            placeholder="Описание поста"/>
        <my-button 
            class="button" 
            style="align-self: flex-end;
            margin-top: 15px;"
            @click="createPost">Создать пост
        </my-button>
    </form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                post: {
                    title: '',
                    body: ''
                }
            }
        },

        methods: {
            createPost() {
                this.post.id = Date.now(),
                this.$emit('create', this.post),
                this.post = {
                    title: '',
                    body: ''
                }
            }
        }
    }
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }

</style>
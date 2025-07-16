<template>
    <div class="post">
        <div>
            <div class="title">{{ post.title }}</div>
            <div>{{ post.body }}</div>
        </div>
        <div class="post_btn">
            <my-button class="button"
            @click="$router.push(`/posts/${post.id}`)"
            >Открыть
            </my-button>
            <my-button class="button"
            @click="$emit('remove', post)"
            >Удалить
        </my-button>
        </div>
    </div>
</template>

<script>
    export default {


        props: {
            post: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped> 
    .post {
        padding: 15px;
        background-color: white;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px;
    }

    .post_btn {
        display: flex;
        gap: 10px;
    }

    .title {
        font-size: 19px;
        font-weight: 700;
        margin-bottom: 10px;
    }
</style>
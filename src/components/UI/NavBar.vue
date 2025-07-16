<template>
    <div class="navbar">
        <div class="title" @click="$router.push('/')">CONNECT</div>
        <div class="navbar_btns">
            <my-button @click="$router.push('/posts')">Лента</my-button>
            <my-button style="margin-left: 20px;" @click="$router.push('/about')">О сайте</my-button>
        </div>
        
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .title {
        color: rgb(29, 79, 216);
        font-size: 20px;
        font-weight: 600;
    }

    .navbar {
        height: 70px;
        background-color: white;
        box-shadow: 2px 2px 4px grey;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }

    .navbar_btns {
        margin-left: auto;
    }
</style>
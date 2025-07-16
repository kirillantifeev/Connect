<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input 
        class="input"
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."/>
        <div  class="app_btns">
            <my-button class="button-add"
                @click="showDialog">
                Добавить пост
            </my-button>
            <my-select 
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions">
            
            </my-select>
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-from @create="createPost"/>
        </my-dialog>
        <post-list 
        :posts="sortedAndSearchedPost"
        v-if="!isPostLoading"
        @remove="removePost"/>
        
        <div v-else>Загрузка...</div>

        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>

import PostFrom from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
import axios from "axios";
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
    components: {
        PostFrom, PostList
    },

    data() {
        return {
            dialogVisible: false,
        }
    },

    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
            setPosts: 'post/setPosts'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),

        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            //this.posts = this.posts.filter(p => p.id !== post.id)
            this.setPosts(this.posts.filter(p => p.id !== post.id)) 
        },
        showDialog() {
            this.dialogVisible = true
        },
        
    },
    mounted() {
            this.fetchPosts();
        },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPage: state => state.post.totalPage,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPost: 'post/sortedAndSearchedPost'
        })

    }
}
</script>

<style>
    .app_btns {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
    }

    .page_wrapper {
        display: flex;
        margin-top: 15px;
    }

    .input {
        border-radius: 5px;
        border: none;
    }

    .page {
        border: 1px solid black;
        padding: 10px;
        cursor: pointer;
    }

    .current-page {
        border: 1px solid rgb(20, 76, 164);
        background-color: rgba(20, 76, 164, 0.5);

    }

    .button-add {
        background-color: white !important;
    }

    .observer {
        height: 50px;
        background-color: rgb(231, 238, 241);
    }
</style>
<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input 
        v-model="searchQuery"
        placeholder="Поиск..."/>
        <div  class="app_btns">
            <my-button
                @click="showDialog">
                Добавить пост
            </my-button>
            <my-select 
            v-model="selectedSort"
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
        
        <!-- <div class="page_wrapper">
            <div v-for="pageNumber in totalPage" 
            :key="pageNumber"
            class="page"
            :class="{
                'current-page' : page === pageNumber
            }"
            @click="changePage(pageNumber)">
            {{ pageNumber }}</div>
        </div> -->

        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>

import PostFrom from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
import axios from "axios";
export default {
    components: {
        PostFrom, PostList
    },

    data() {
        return {
            posts: [],
            title: '',
            body: '',
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPage: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'}
            ]
        }
    },

    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber;
        //     this.fetchPosts();
        // },
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data;
            }
            catch(e) {
                alert('Произошла ошибка', e)
            }
            finally {
                this.isPostLoading = false;
            }
        },

        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
            }
            catch(e) {
                alert('Произошла ошибка', e)
            }
        },
    },
    mounted() {
            this.fetchPosts();

            // const options = {
            //     rootMargin: '0px',
            //     threshold: 1.0
            // };

            // const callback = (entries, observer) => {
            //     if (entries[0].isIntersecting && this.page < this.totalPage) {
            //         this.loadMorePosts()
            //     }
            // };

            // const observer = new IntersectionObserver(callback, options);
            // observer.observe(this.$refs.observer)
        },
    computed: {
        sortedPosts() {
            return [... this.posts].sort((post1, post2) => {
                
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        }
        ,
        sortedAndSearchedPost() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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

    .page {
        border: 1px solid black;
        padding: 10px;
        cursor: pointer;
    }

    .current-page {
        border: 1px solid rgb(20, 76, 164);
        background-color: rgba(20, 76, 164, 0.5);

    }

    .observer {
        height: 30px;
        background-color: blue;
    }
</style>
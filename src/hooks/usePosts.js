import axios from "axios";
import { onMounted, ref } from "vue";

export function usePosts (limit) {

    const posts = ref([]);
    const totalPage = ref(0);
    const isPostLoading = ref(true);

    const fetching = async () => {
            try {
                isPostLoading.value = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: page,
                        _limit: limit
                    }
                });
                totalPage.value = Math.ceil(response.headers['x-total-count'] / limit)
                posts.value = response.data;
            }
            catch(e) {
                alert('Произошла ошибка', e)
            }
            finally {
                isPostLoading.value = false;
            }
    }

    onMounted(fetching);
    return {
        posts,
        totalPage,
        isPostLoading
    }

    
}
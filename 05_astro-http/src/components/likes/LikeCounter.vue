<template>

  <div v-if="isLoading">
    Loading..
  </div>

  <button v-else-if="likeCount === 0" @click="likePost">
    Like this post
  </button>

  <button v-else @click="likePost">
    Likes
    <span>{{ likeCount }}</span>
  </button>

</template>

<script lang="ts" setup>
import { ref } from 'vue';


  interface Props {
    postId: string;
  }

  const props = defineProps<Props>() // Se definen las props en vue (props.postId) que se reciben
 
  const likeCount = ref(0);     // Valor en bd
  const likeClicks = ref(0);    // Cantidad de likes al darle click
  const isLoading = ref(true);

  const likePost = () => {
    console.log("+1 like");
  }

  const getCurrentLikes = async() => {
    const resp = await fetch(`/api/posts/likes/${props.postId}`);
    if(!resp.ok) return

    const data = await resp.json()
    
    likeCount.value = data.likes;
    isLoading.value = false;
  }

  getCurrentLikes();

</script>

<style scoped>
  button {
    background-color: #5e51bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }

  button:hover {
    background-color: #4a3f9a;
  }
</style>
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

  {{ likeClicks }}

</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti'
import debounce from 'lodash.debounce'
import { actions } from 'astro:actions';


  interface Props {
    postId: string;
  }

  const props = defineProps<Props>()      // Se definen las props en vue (props.postId) que se reciben
 
  const likeCount = ref(0);               // Valor en bd
  const likeClicks = ref(0);              // Cantidad de likes al darle click
  const isLoading = ref(true);

  watch(likeCount, debounce(() => {       // 3º Cuando se incrementa el valor de los likes recibidos desde la bd
    actions.updatePostsLikes({            // usamos la action updatePostLikes para actualizar en bd los likes pulsado en el postId
      postId: props.postId,
      likes: likeClicks.value,
    })

    likeClicks.value = 0;
   
  },500 ))

  const likePost = () => {                // 2º Cuando se hace click en el boton de like se activa esta función
   likeCount.value++                      // que incrementa el valor de los likes recibidos desde la bd
   likeClicks.value++                     // y el de los clicks realizados
   confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
   })
  }

  const getCurrentLikes = async() => {                               // 1º Cuando se cargue el componente 
    
    const resp = await actions.getPostLikes(props.postId)            // obtenemos mediante la actions todos los likes del post 
    const likes  = resp.data?.likes || 0

    likeCount.value = likes                                          // y actualizamos localmente el valor de los likes que mostramos en el html

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
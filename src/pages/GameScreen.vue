<template>
  <q-page @click="checkClickPosition" class="tw-flex tw-font-Mitr tw-items-center tw-justify-center tw-relative " 
  :class="bg">
    <q-img src="wrong.svg" class="tw-w-16 tw-absolute tw-top-5 tw-left-5" />
    <q-img src="correct.svg" class="tw-w-16 tw-absolute tw-bottom-5 tw-left-5" />

    <p class="tw-absolute tw-top-[6px] tw-left-24 tw-text-[60px] tw-text-[#ff5964]">{{ right }}</p>

    <div class="we-flex tw-items-center tw-justify-center">
      <p
       v-if=!status class="text-primary tw-font-Mitr tw-font-semibold tw-text-6xl tw-w-60 tw-text-center removeAfterTimeout"
      >
        {{ counter }}
      </p>


      <p
       v-if=status class=" tw-font-Mitr tw-font-semibold tw-text-6xl tw-text-center removeAfterTimeout"
      >
      {{ currentWord }}     
     </p>
    </div>

    <p
      class="tw-absolute tw-font-Mitr tw-font-semibold tw-text-3xl tw-text-white tw-top-5 tw-right-5 removeAfterTimeout"
    >
      {{ currentPlayer }}
    </p>

    <div v-if="status" class="tw-flex tw-col tw-absolute tw-w-40 tw-h-16 tw-bg-white tw-rounded-lg tw-bottom-5 tw-right-5 tw-items-center tw-justify-center">
        <p class=" tw-font-semibold tw-text-xl tw-text-black">50:50 sek</p>

    </div>

    <p class="tw-absolute tw-bottom-[8px] tw-left-24 tw-text-[60px] tw-text-[#048b79]">{{ wrong }}</p>
  </q-page>
</template>

<script setup>
import guessData from "../guessList.json";

import { useQuasar } from 'quasar'
import { ref } from 'vue'

const counter = ref(5)
const status = ref(false)
const right = ref(0)
const wrong = ref(0)
const bg = ref('')
const words = ref(guessData.words)
const currentWord = ref('') 

const randomIndex = ref(Math.floor(Math.random() * words.value.length));
currentWord.value = words.value[randomIndex.value].word; 

const checkClickPosition = (e) =>{  
    const bottomBoundary = window.innerHeight / 2;
    
    
    if (e.clientY >= bottomBoundary) {
        wrong.value++;
        bg.value = 'tw-bg-[#048b79]';
        setTimeout(() => {
            bg.value = 'tw-bg-black';
        }, 1000);
    } else {
        right.value++;
        bg.value = 'tw-bg-[#ff5964]';
        setTimeout(() => {
            bg.value = 'tw-bg-black';
        }, 1000);
    }

    setTimeout(() => {
    randomIndex.value = Math.floor(Math.random() * words.value.length);
    currentWord.value = words.value[randomIndex.value].word; 
  }, 1000);
}

setInterval(() => {
  if (counter.value > 0) {
    counter.value = counter.value - 1;
  } else {
    status.value = true;
  }
}, 1000)

const $q = useQuasar();
const currentPlayer = $q.localStorage.getItem('players')[0]['name'];
</script>
<template>
  <q-page
    @click="checkClickPosition"
    class="tw-flex tw-font-Mitr tw-items-center tw-justify-center tw-relative"
    :class="bg"
  >
    <q-img src="wrong.svg" class="tw-w-16 tw-absolute tw-top-5 tw-left-5" />
    <q-img src="correct.svg" class="tw-w-16 tw-absolute tw-bottom-5 tw-left-5" />

    <p class="tw-absolute tw-top-[6px] tw-left-24 tw-text-[60px] tw-text-[#ff5964]">{{ right }}</p>

    <div class="we-flex tw-items-center tw-justify-center">
      <p
        v-if="!cTimer.isExpired.value"
        class="text-primary tw-font-Mitr tw-font-semibold tw-text-6xl tw-w-60 tw-text-center"
      >
        {{ cTimer.seconds }}
      </p>

      <p v-if="cTimer.isExpired.value" class="tw-font-Mitr tw-font-semibold tw-text-6xl tw-text-center">
        {{ currentWord }}
      </p>
    </div>

    <p
      class="tw-absolute tw-font-Mitr tw-font-semibold tw-text-3xl tw-text-white tw-top-5 tw-right-5"
    >
      {{ currentPlayer }}
    </p>

    <div
      v-if="cTimer.isExpired.value"
      class="tw-flex tw-col tw-absolute tw-w-40 tw-h-16 tw-bg-white tw-rounded-lg tw-bottom-5 tw-right-5 tw-items-center tw-justify-center"
    >
      <p class="tw-font-semibold tw-text-xl tw-text-black">  {{timer.seconds}} sek
      </p>
    </div>

    <p class="tw-absolute tw-bottom-[8px] tw-left-24 tw-text-[60px] tw-text-[#048b79]">
      {{ wrong }}
    </p>
  </q-page>
</template>

<script setup>
import guessData from '../guessList.json'

import { useQuasar } from 'quasar'
import { reactive,watch } from 'vue'
import { ref } from 'vue'
import { useTimer } from 'vue-timer-hook';
import {  watchEffect, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { Haptics} from '@capacitor/haptics';




const counter = ref(5)
const right = ref(0)
const wrong = ref(0)
const bg = ref('')
const words = ref(guessData.words)
const currentWord = ref('')
const players = reactive([])
const solutions = reactive([])

const randomIndex = ref(Math.floor(Math.random() * words.value.length))

const router = useRouter()

const cTime = new Date();
cTime.setSeconds(cTime.getSeconds() + 5);
const cTimer = useTimer(cTime);



const time = new Date();
time.setSeconds(time.getSeconds() + 60);
const timer = useTimer(time);

onMounted(() => {
  watchEffect(async () => {
    if(timer.isExpired.value) {
      router.push('/stats')

    }
  })
})

const $q = useQuasar()

const savedPlayers = $q.localStorage.getItem('players')
players.push(...savedPlayers);

let playerIndex = 0;
for (let i = 0; i < players.length; i++) {
console.log(players.length)
if (players[i].turn == true) {
playerIndex = i;
players[i].turn = false
break
}

}

const currentPlayer = players[playerIndex].name

const savePlayerScore = () => {
 
  players[playerIndex].score = wrong.value

}

watch(players, (value) => {
  $q.localStorage.setItem('players', value)
  console.log($q.localStorage.getItem('players')[playerIndex])

})

const hapticsVibrate = async () => {
  await Haptics.vibrate();
};

const checkClickPosition = (e) => {
  const bottomBoundary = window.innerHeight / 2

  if (e.clientY >= bottomBoundary) {
    wrong.value++


hapticsVibrate()
    savePlayerScore()

    bg.value = 'tw-bg-[#048b79]'
    setTimeout(() => {
      bg.value = 'tw-bg-black'
    }, 1000)
  } else {
    hapticsVibrate()

    right.value++
    savePlayerScore()

    bg.value = 'tw-bg-[#ff5964]'
    setTimeout(() => {
      bg.value = 'tw-bg-black'
    }, 1000)
  }

  setTimeout(() => {
    randomIndex.value = Math.floor(Math.random() * words.value.length)
    currentWord.value = words.value[randomIndex.value].word
    solutions.push(currentWord.value)
    players[playerIndex].solutions = solutions
    }, 1000)
}

const interval = setInterval(() => {
  counter.value--
  if (counter.value === playerIndex) {
    clearInterval(interval)
    currentWord.value = words.value[randomIndex.value].word
  }
}, 1000)

</script>

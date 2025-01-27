<template>
    <q-page class="tw-flex tw-items-center  tw-flex-col">


        <h2
        class="tw-mt-20  tw-font-Mitr  tw-text-4xl tw-w-60 tw-text-center"
      >
      Stats for
      </h2>
      <p
        class="tw-mt-5 text-primary tw-font-Mitr tw-font-semibold tw-text-6xl tw-w-60 tw-text-center"
      >
      {{ currentPlayer }}
      </p>

      <p
        class="tw-mt-5  tw-font-Mitr  tw-text-4xl tw-w-60 tw-text-center"
      >
      Correct: {{ score }} of {{ wordlist.length }}
      </p>
      <q-list
        bordered
        class="tw-mt-20 tw-rounded-lg tw-p-4 tw-overflow-x-hidden tw-overflow-y-scroll tw-text-white tw-text-2xl tw-w-64 tw-h-80 tw-bg-white/30"
      >

      <p
        class="tw-mt-2  tw-mb-5  tw-font-Mitr  tw-text-3xl tw-w-60 tw-text-center"
      >
      Solutions
      </p>
        <q-item v-for="(word, index) in wordlist" :key="word">
          <q-item-section>
            <q-item-label>
             {{index+1}}. {{ word }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="tw-p-10 tw-flex tw-justify-end tw-w-full">
        <q-btn
          @click="changeStatus(), $router.push('/game-screen')"
          color="white"
          text-color="black"
          label="Next Player"
          push
          class="tw-text-2xl tw-p-4"
        />
      </div>
    </q-page>
  </template>
  
  <script setup>
  //local storage
  import { useQuasar } from 'quasar'
  import { reactive,watch } from 'vue'

  
  
  const players = reactive([])

  const $q = useQuasar()

  const savedPlayers = $q.localStorage.getItem('players')
  players.push(...savedPlayers);

let playerIndex = 0;
for (let i = 0; i < players.length; i++) {
console.log(players.length)
if (players[i].turn == false) {
playerIndex = i;
}

}

  const currentPlayer = players[playerIndex].name
  const score = players[playerIndex].score

  const wordlist = players[playerIndex].solutions

  
const changeStatus = () => {

    let roundOver = false;
    for (let i = 0; i < players.length; i++) {
    if (players[i].turn == true) { 
      roundOver = false;
    } else {
      roundOver = true;
    }
  }

  if (roundOver == true) {
    for (let i = 0; i < players.length; i++) {
      players[i].turn = true;
  }
  }

}

  watch(players, (value) => {
  $q.localStorage.setItem('players', value)
  console.log($q.localStorage.getItem('players')[playerIndex])

})


  </script>
  
<template>
  <q-page class="tw-flex tw-items-center tw-flex-col">
    <p
      class="tw-mt-32 text-primary tw-font-Mitr tw-font-semibold tw-text-6xl tw-w-60 tw-text-center"
    >
      Add Players
    </p>
    <q-input class="tw-mt-10" filled v-model="newPlayer.name" label="Enter Name" bg-color="white">
      <template v-slot:append>
        <q-icon name="check" @click="addPlayer" class="cursor-pointer" />
      </template>
    </q-input>
    <q-list
      bordered
      class="tw-mt-20 tw-rounded-lg tw-p-4 tw-overflow-x-hidden tw-overflow-y-scroll tw-text-white tw-text-2xl tw-w-64 tw-h-80 tw-bg-white/30"
    >
      <q-item v-for="player in players" :key="player.name">
        <q-item-section>
          <q-item-label>
            {{ player.name }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            flat
            round
            dense
            icon="delete"
            @click="removePlayer(player)"
            class="tw-text-wrong-guess"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
//store a single player containing a name in a players object with add and remove functions
const newPlayer = reactive({ name: '' })
const players = reactive([])

const addPlayer = () => {
  if (newPlayer.name) {
    players.push({ name: newPlayer.name })
    newPlayer.name = ''
  }
}

const removePlayer = (player) => {
  players.splice(players.indexOf(player), 1)
}
</script>

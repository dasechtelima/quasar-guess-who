<template>
  <q-page class="tw-flex tw-font-Mitr tw-items-center tw-flex-col">
    <p class="tw-mt-32 tw-text-center tw-text-4xl removeAfterTimeout">You're starting</p>
    <p
      class="text-primary tw-font-Mitr tw-font-semibold tw-text-6xl tw-w-60 tw-text-center removeAfterTimeout"
    >
      {{ currentPlayer }}
    </p>
    <q-img src="flip-phone.svg" class="tw-mt-10 tw-w-36 rotatePhone" />
    <p class="tw-mt-10 tw-font-Mitr tw-text-center tw-text-4xl tw-mx-10 removeAfterTimeout">
      Flip the phone and hold it against your forehead now!
    </p>
  </q-page>
</template>
<script setup>
//get first player from local storage players object
import { useQuasar } from 'quasar'

const $q = useQuasar()
const currentPlayer = $q.localStorage.getItem('players')[0]['name']
</script>
<style>
.removeAfterTimeout {
  animation: removeText 0s ease-in 3s forwards;
  animation-fill-mode: forwards;
}
@keyframes removeText {
  to {
    width: 0;
    height: 0;
    display: none;
  }
}

.rotatePhone {
  animation: rotatePhone 3s linear forwards;
}
@keyframes rotatePhone {
  to {
    transform: rotate(90deg);
  }
}
</style>

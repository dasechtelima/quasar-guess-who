<template>
  <q-page class="tw-flex tw-justify-center tw-items-center tw-flex-col">
    <p class="tw-absolute tw-top-60 text-primary tw-font-Mitr tw-font-semibold tw-text-6xl">
      GuessWho
    </p>
    <div class="tw-gap-8 tw-flex tw-flex-col tw-items-center">
      <q-btn
        color="white"
        text-color="black"
        label="Fast Game"
        push
        class="tw-w-56 tw-text-2xl tw-py-3"
      />
      <q-btn
        @click="$router.push('/add-players')"
        color="white"
        text-color="black"
        label="Add Players"
        push
        class="tw-w-56 tw-text-2xl tw-py-3"
      />
    </div>
    <q-img src="guess-illustration.svg" class="tw-w-72 tw-absolute tw-bottom-5" />
  </q-page>
</template>

<script setup>
//
</script>

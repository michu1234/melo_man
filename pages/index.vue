<template>
<v-container class="app-welcome elevation-10 text-md-center grey darken-4">
  <p>Witaj w aplikacji Melo Man!</p>
  <p class="caption">Zacznij od wyszukania ulubionych zasobów.</p>
  <img class="mt-3 app-image" src="../static/logo.fw.png" alt="">
</v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import axios from 'axios'
  import {config} from '../middleware/config'

export default {
    async fetch ({ store, params }) {
    let response = await axios.get(`${config.development.API_URL}topalbums/limit=100/json`)
    store.commit('updateAlbumsData', response.data.feed.entry)
    console.log('pukniecie')
  },
  components: {
  },
        computed: {
      ...mapGetters([
        'albumsData'
      ])
    }
}
</script>
<style>
.app-image {
  filter: brightness(15%) grayscale(100%);
  animation: pulse 5s ease infinite;
}

.app-welcome {
  min-height: 30vh;
  max-width: 50vw;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1) rotateZ(90deg);
  }
  100% {
    transform: scale(1);
  }
}
</style>
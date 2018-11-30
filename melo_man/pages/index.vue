<template>
<div>
  <p>Witaj w aplikacji Melo Man</p>
  <p>Zacznij od wyszukania ulubionych zasobów</p>
</div>
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

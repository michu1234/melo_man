<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" fixed app>
      <v-list>
        <transition-group name="fade">
          <v-list-tile v-for="(album, i) in albumsData" :to="`/albums/${album['im:artist'].label}`" :key="i" router
            exact>
            <v-list-tile-action>
              <v-icon v-text="album.icon" />
            </v-list-tile-action>
            <v-list-tile-content @click="selectAlbum({a: album.title.label, b: album['im:artist'].label})">
              <v-list-tile-title v-text="album['im:artist'].label" />
              <v-list-tile-sub-title class="caption" v-text="album['im:name'].label" />
            </v-list-tile-content>
          </v-list-tile>
        </transition-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <img src="../static/logo.fw.png" alt="logo melo man">
      <v-toolbar-title v-text="title" />

      <v-text-field class="ml-auto search-box mt-2" style="max-width: 300px" v-if="showSearchBar" v-model.lazy="searchTerm"
        label="Search..." required></v-text-field>
      <v-btn icon class="ml-auto">
        <v-icon @click.native="showSearchInput">search</v-icon>
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <transition name="fade">
          <info-alert v-if="info" />
          <success-alert v-if="success" />
        </transition>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer :right="right" v-model="rightDrawer" temporary fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
        <p class="ml-3 caption">Favourites:</p>
        <hr class="mb-3">
        <v-flex xs12 sm12 class="favourite-cards">
          <v-card class="mb-4 transparent" v-for="(album, index) in favouriteAlbums" :key="index">
            <v-img class="elevation-5 grey darken-4" :src='album["im:image"][2].label' height="125px" contain></v-img>

            <v-card-title primary-title>
              <div>
                <div class="caption">{{album['im:artist'].label}}</div>
                <span class="grey--text caption">{{album['im:name'].label}}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat>Remove</v-btn>
              <v-spacer></v-spacer>
              <span class="mt-2 text-xs-right">{{album["im:price"].label}}</span>
            </v-card-actions>
          </v-card>
        </v-flex>

      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>by michu1234 &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {
    mapMutations,
    mapGetters,
    mapState
  } from 'vuex'
  import axios from 'axios'
  import {
    config
  } from '../middleware/config'
  import InfoAlert from '../components/InfoAlert.vue'
  import SuccessAlert from '../components/SuccessAlert.vue'

  export default {
    async fetch({
      store,
      params
    }) {
      let response = await axios.get(`${config.development.API_URL}topalbums/limit=100/json`)
      store.commit('updateAlbumsData', response.data.feed.entry)
    },
    components: {
      'info-alert': InfoAlert,
      'success-alert': SuccessAlert
    },
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        showSearchBar: false,
        searchTerm: '',
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Melo Man'
      }
    },
    watch: {
      searchTerm() {
        this.updateSearchTerm(this.searchTerm);
      }
    },
    computed: {
      ...mapState({
        info: 'infoalert',
        success: 'successalert'
      }),
      ...mapGetters([
        'albumsData',
        'favouriteAlbums'
      ])
    },
    methods: {
      showSearchInput() {
        this.showSearchBar = !this.showSearchBar;
      },
      selectAlbum(payload) {
        this.updateSelectedAlbum(payload);
      },
      ...mapMutations([
        'updateSearchTerm',
        'updateSelectedAlbum',
      ])
    }
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
  }

  .favourite-cards div.v-image__image {
    background-size: cover;
    filter: sepia(100%);
  }
</style>
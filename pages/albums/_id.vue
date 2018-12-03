<template>
  <div>
    <p>You've selected <span class="font-weight-black">{{id}}'s</span> album!</p>



    <v-container fluid grid-list-lg v-for="(album, index) in selectedAlbums" :key="index">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="green accent-4" class="black--text">
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline"> {{album["im:artist"].label}}</div>
                    <div>{{album["im:name"].label}}</div>
                    <div>{{album["im:releaseDate"].attributes.label}}</div>
                    <v-btn small color="light-green accent-4 mt-3">Buy Now</v-btn>
                    <v-btn @click="addToFavourites(album)" small color="teal darken-4 mt-3">Add to favourites</v-btn>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs5>
                <v-img class="elevation-5 green accent-3 mr-3" :src='album["im:image"][2].label' height="125px" contain></v-img>
              </v-flex>
            </v-layout>
              <p class="text-xs-right mr-4 white--text">Category: <span class="font-weight-black">{{album.category.attributes.label}}</span></p>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3">
              Price: {{album["im:price"].label}}
              <v-spacer></v-spacer>
              <span class="mr-2">Rate album:</span>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
<hr class="mt-5">
<p class="mt-2">Related albums:</p>

    <v-container fluid grid-list-lg v-for="(album, index) in allRelatedAlbums" :key="album.id.attributes['im:id']">
              <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-layout>
                <v-flex xs5>
                  <v-img class="elevation-5 blue-grey darken-3 ml-3" :src='album["im:image"][2].label' height="125px" contain></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                    <div class="headline"> {{album["im:artist"].label}}</div>
                    <div>{{album["im:name"].label}}</div>
                    <div>{{album["im:releaseDate"].attributes.label}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
            <v-card-actions class="pa-3">
              Price: {{album["im:price"].label}}
              <v-spacer></v-spacer>
              <span class="mr-2">Rate album:</span>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
            </v-card-actions>
          </v-card>
          </v-flex>
</v-container>



  </div>
</template>

<script>
  import {
    mapMutations,
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {
        id: this.$route.params.id
      }
    },
    computed: {
      ...mapGetters([
        'albumsData',
        'selectedAlbums',
        'allRelatedAlbums'
      ])
    },
    methods: {
      ...mapMutations([
      'addToFavourites'
    ])
    }
  }
</script>

<style>

</style>

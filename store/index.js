import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      albumsFullData: [],
      searchTerm: '',
      selectedAlbum: '',
      selectedArtist: '',
      favouriteAlbums: []
    }),
    getters: {
      albumsData(state) {
        let currentState = [];
        state.albumsFullData.forEach((d) => {
          if (d.title.label.toLowerCase().includes(state.searchTerm)) {
            d.icon = 'album'
            currentState.push(d)
          } else {
            return state.albumsFullData;
          }
        });
        return currentState;
      },
      selectedAlbums(state) {
        let choosenAlbum = [];
        state.albumsFullData.forEach((d)=>{
            if(d.title.label === state.selectedAlbum) {
              choosenAlbum.push(d)
            }
        })
        return choosenAlbum;
      },
      allRelatedAlbums(state) {
        let relatedAlbums = [];
        state.albumsFullData.forEach((d)=>{
          if(d['im:artist'].label === state.selectedArtist){
            relatedAlbums.push(d);
          }
      })
      return relatedAlbums;
      },
      favouriteAlbums(state) {
        return state.favouriteAlbums;
      }
    },
    mutations: {
      updateAlbumsData(state, payload) {
        state.albumsFullData = payload;
      },
      updateSearchTerm(state, payload) {
        state.searchTerm = payload;
      },
      updateSelectedAlbum(state, payload) {
        state.selectedAlbum = payload.a;
        state.selectedArtist = payload.b;
      },
      addToFavourites(state, payload) {
        console.log(state.albumsFullData)
        state.favouriteAlbums.push(payload);
      }
    }
  })
}

export default createStore
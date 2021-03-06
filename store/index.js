import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      albumsFullData: [],
      searchTerm: '',
      selectedAlbum: '',
      selectedArtist: '',
      favouriteAlbums: [],
      infoalert: false,
      successalert: false
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
      },
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
      state.favouriteAlbums.push(payload);
      state.successalert = true;
      setTimeout(()=>{return state.successalert = false}, 2000);
      let getLocal = window.localStorage.getItem('test')
      if(getLocal) {
        let localS = JSON.parse(getLocal)
        localS.push(payload);
    window.localStorage.setItem('test', JSON.stringify(localS))
      } else {
        window.localStorage.setItem('test', JSON.stringify([payload]))
      }
      },
      updateFavouriteList(state, payload) {
        state.favouriteAlbums = payload;
      }
    }
  })
}

export default createStore
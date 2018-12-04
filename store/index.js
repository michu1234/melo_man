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

      let getLocal = window.localStorage.getItem('test')

      if(getLocal) {
        let localS = JSON.parse(getLocal)
        let localArr = [...getLocal];
          console.log(localArr)
        window.localStorage.setItem('test', JSON.stringify(localArr.push(payload)))
      } else {
        window.localStorage.setItem('test', JSON.stringify([payload]))
        let getLocal = window.localStorage.getItem('test')
        let localS = JSON.parse(getLocal)
        console.log(localS)
      }
      }
    }
  })
}

export default createStore
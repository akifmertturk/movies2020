// jshint esversion: 6

import Navbar from './components/Navbar';
import { computed, watch, reactive, ref, toRefs, toRef } from '@vue/composition-api';

export default {
  components: { Navbar },
  name: 'App',
  props: {
    
  },

  setup () {
    let state = reactive({
      result: {},
      entries: [],
      isLoading: false,
      model: null,
      poster: "",
    });
    
    /* let stateSearch = ref({
      search: ""
    }); */

    const stateSearch = ref({
      search: "",
    });

    const fields = computed(() => {
      if (!state.model) return [];
      return Object.keys(state.model).map(key => {
        console.log('key is :' + state.model[key]);
        return {
          key,
          value: state.model[key] || 'n/a',
        };
      });
    });

    watch(stateSearch.value, (val) => {
      console.log('val is: ' + val);
      
      state.isLoading = true;

      var query = 'https://www.omdbapi.com/?y=2020&apikey=6d9c59a7&t=';
      
      var newVal = val.split(' ').join('+'); // replace spaces with plus char to make string available for api query

      // Lazily load input items
      console.log('query is: '+ query + newVal);
      
      fetch(query + val + '*')
        .then(res => res.json())
        .then(res => {
          state.result.Title = res.Title;
          state.result.imdbRating = res.imdbRating;
          state.result.Year = res.Year;
          state.result.Genre = res.Genre;
          state.poster = res.Poster;
          state.entries.push(state.result);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (state.isLoading = false));
    });

    const items = computed(() => {
      return state.entries.map(entry => {
        const Title = entry.Title;
        return Object.assign({}, entry, {Title});
      });
    });

    return {
      ...toRefs(state),
      ...toRef(stateSearch),
      fields,
      items
    };
  },

  /*   
  computed: {
    fields () {
      console.log(this.model);

      if (!this.model) return []
      return Object.keys(this.model).map(key => {
        console.log('key is :' + this.model[key]);
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    }, 
    items () {
      return this.entries.map(entry => {
        const Title = entry.Title
        return Object.assign({}, entry, {Title})
      })
    },
  },

  watch: {
    search (val) {
      console.log('val is: ' + val);
      
      this.isLoading = true

      var query = 'https://www.omdbapi.com/?y=2020&apikey=6d9c59a7&t=';
      
      var newVal = val.split(' ').join('+'); // replace spaces with plus char to make string available for api query

      // Lazily load input items
      console.log('query is: '+ query + newVal);
      
      fetch(query + val + '*')
        .then(res => res.json())
        .then(res => {
          this.result.Title = res.Title
          this.result.imdbRating = res.imdbRating
          this.result.Year = res.Year
          this.result.Genre = res.Genre
          this.poster = res.Poster
          this.entries.push(this.result)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
  */
};
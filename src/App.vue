<template>
  <v-app class="grey dark">
    <Navbar />

    <div class="home" style="margin-top: 100px">
        
      <v-card-text>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading" 
        :search-input.sync="search"
        cache-items
        color="black"
        hide-no-data
        hide-selected
        item-text="Title"
        item-value="Title"
        label="Movies in 2020"
        loader-height="10"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list
          v-if="model"
          class="blue lighten-4"
        >
        <v-row align="center">
          <v-col cols="4" sm="1" centered>
            <v-img 
            :src="poster" alt="poster" max-width="200" max-height="200" class="ml-4"></v-img>
          </v-col>
          <v-col cols="12" sm="4">
            <v-list-item
              v-for="(field, i) in fields"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="field.value"></v-list-item-title>
                <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        </v-list>
      </v-expand-transition>

    </div>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: { Navbar },
  name: 'App',

  data: () => ({
    descriptionLimit: 60,
    result: {},
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    posterUrl: ''
  }),

  computed: {
    poster () {
      if(!this.model) return ''
      if(this.entries === []) return ''
      return this.posterUrl
    },
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
          this.posterUrl = res.Poster
          if(this.entries.length < 1){
            // user types for a movie first time, fill the array with the result of the query
            this.entries.push(this.result)
          }
          else if(typeof this.entries[0].Title === 'undefined') {
            // user deleted the search box, so clear the array
            this.entries = []
          }
          // user uses the same item in the search box, do nothing
          console.log('entries len: ' + this.entries.length);
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
};
</script>
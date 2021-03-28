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
            :src="poster" alt="image" max-width="200" max-height="200" class="ml-4"></v-img>
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
import App from './app.js'

export default App
</script>

<template>
  <div class="container">
    <h1 class="title">Movie List</h1>
    <div class="search-bar">
      <label for="search">Search by Title:</label>
      <input type="text" id="search" v-model="searchTerm" />
    </div>
    <div class="movie-list">
      <div v-for="movie in filteredMovies" :key="movie.imdbID" class="movie-card">
        <div class="poster">
          <img :src="movie.Poster === 'N/A' ? noImagePlaceholder : movie.Poster" :alt="movie.Title" />
        </div>
        <div class="movie-info">
          <h2 class="movie-title">{{ movie.Title }}</h2>
          <p class="movie-year">{{ movie.Year }}</p>
          <button class="movie-details" @click="getMovieDetails(movie.imdbID)">Details</button>
        </div>
      </div>
    </div>
    <div v-if="selectedMovie" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="selectedMovie = null">&times;</span>
        <h2>{{ selectedMovie.Title }}</h2>
        <p>{{ selectedMovie.Plot }}</p>
        <p><strong>Director:</strong> {{ selectedMovie.Director }}</p>
        <p><strong>Actors:</strong> {{ selectedMovie.Actors }}</p>
        <p><strong>Genre:</strong> {{ selectedMovie.Genre }}</p>
        <p><strong>Runtime:</strong> {{ selectedMovie.Runtime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MovieList',
  data() {
    return {
      movies: [],
      searchTerm: '',
      selectedMovie: null,
      noImagePlaceholder: 'https://via.placeholder.com/120x180.png?text=No+Image',
    };
  },
  watch: {
    searchTerm: function(newSearchTerm) {
      if (newSearchTerm !== "") {
        this.fetchMovies();
      } else {
        this.movies = [];
      }
    }
  },
  async created() {
    const response = await axios.get(`http://www.omdbapi.com/?s=${this.searchTerm}&apikey=${process.env.VUE_APP_OMDB_API_KEY}`);
    this.movies = response.data.Search;
  },
  computed: {
  filteredMovies() {
    if (!this.movies) {
      return [];
    }
    return this.movies.filter((movie) =>
      movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  },
},

  methods: {
    fetchMovies: function() {
      const apiKey = process.env.VUE_APP_OMDB_API_KEY;
      const url = `http://www.omdbapi.com/?s=${this.searchTerm}&apikey=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.movies = data.Search;
        })
        .catch(error => {
          console.error(error);
        });
    },
    async getMovieDetails(imdbID) {
      console.log({apiKey:process.env.VUE_APP_API_KEY})
      const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.VUE_APP_OMDB_API_KEY}`);
      this.selectedMovie = response.data;
    },
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  margin-bottom: 2rem;
  align-items: center;
}

label {
  margin-right: 1rem;
  font-size: 1.5rem;
}

input[type='text'] {
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #bbb;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie-card {
  background-color: #fff;
  box-shadow: 0px 0px 5px #bbb;
  margin: 1rem;
  width: 300px;
  display: flex;
  align-items: center;
}

.poster {
  width: 150px;
  height: 225px;
  margin-right: 1rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
}

.poster img {
  height: 100%;
}

.movie-info {
  flex: 1;
}

.movie-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.movie-year {
  margin: 0;
  color: #777;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.movie-details {
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #0077ff;
  color: #fff;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
}

.movie-details:hover {
  background-color: #0055ff;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0px 0px 5px #bbb;
  position: relative;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #777;
}

.close-button:hover {
  color: #000;
}
</style>

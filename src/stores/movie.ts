import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Movie, SearchHistory } from '@/types/search'
import axios from 'axios'

const API_URL = 'http://www.omdbapi.com/?apikey=64e13ed5'

export const useMovieStore = defineStore('movie', () => {
  const movies = ref([] as Movie[])
  const totalMovies = ref(0)
  const history = ref([] as SearchHistory[])

  async function fetchMovies(searchTerm: string) {
    const results = (await axios.get(`${API_URL}&s=${searchTerm}`)).data

    if (results.Response === 'True') {
      movies.value = results.Search
      totalMovies.value = parseInt(results.totalResults)
      history.value.push({
        searchTerm: searchTerm,
        successful: true
      })
    } else {
      history.value.push({
        searchTerm: searchTerm,
        successful: false
      })
    }
  }

  return { movies, totalMovies, history, fetchMovies }
})

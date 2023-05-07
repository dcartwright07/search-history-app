import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Movie, SearchHistory, SearchHistoryOptions } from '@/types/search'
import axios from 'axios'

const API_URL = 'http://www.omdbapi.com/?apikey=64e13ed5'

export const useMovieStore = defineStore('movie', () => {
  const movies = ref([] as Movie[])
  const totalMovies = ref(0)
  const history = ref([] as SearchHistory[])
  const page = ref(1)
  const currentErrorMessage = ref('' as string | undefined)

  async function fetchMovies(searchTerm: string) {
    const results = (await axios.get(`${API_URL}&s=${searchTerm}`)).data

    if (results.Response === 'True') {
      movies.value = results.Search
      totalMovies.value = parseInt(results.totalResults)
      updateHistory(searchTerm, { totalResults: parseInt(results.totalResults) })
    } else {
      updateHistory(searchTerm, { errorMessage: results.Error })
    }
  }

  async function fetchMoreMovies(searchTerm: string) {
    page.value += 1
    const results = (await axios.get(`${API_URL}&s=${searchTerm}&page=${page.value}`)).data

    if (results.Response === 'True') {
      movies.value.push(...results.Search)
      updateHistory(searchTerm, { totalResults: parseInt(results.totalResults) })
    } else {
      updateHistory(searchTerm, { errorMessage: results.Error })
    }
  }

  function updateHistory(searchTerm: string, { totalResults, errorMessage }: SearchHistoryOptions) {
    const historyObj = {
      searchTerm: searchTerm,
      dateTime: new Date()
    } as SearchHistory

    if (totalResults) {
      historyObj.totalResults = totalResults
      historyObj.successful = true
      currentErrorMessage.value = ''
    } else {
      historyObj.successful = false
      historyObj.errorMessage = errorMessage
      currentErrorMessage.value = errorMessage
      movies.value = []
      totalMovies.value = 0
    }

    history.value.push(historyObj)
  }

  return { movies, totalMovies, history, currentErrorMessage, fetchMovies, fetchMoreMovies }
})

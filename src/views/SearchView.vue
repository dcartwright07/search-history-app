<script lang="ts" setup>
import { useMovieStore } from '@/stores/movie'
import { computed } from 'vue'

const movieStore = useMovieStore()

const movies = computed(() => movieStore.movies)
const totalMovies = computed(() => movieStore.totalMovies)
const errorMessage = computed(() => movieStore.currentErrorMessage)

const hasPoster = (poster: string) => poster !== 'N/A'

const getSuggestion = (message: string) => {
  switch (message) {
    case 'Too many results.':
      return 'Try making your search more specific.'
    default:
      return 'Try a different search term.'
  }
}

const fetchMovies = (search: string) => movieStore.fetchMovies(search)
const fetchMoreMovies = (search: string) => movieStore.fetchMoreMovies(search)
</script>

<template>
  <main>
    <h1 class="mt-16 sm:mt-15 mb-3 max-w-xl mx-auto text-center px-2">
      Look up any movie, series, or game and see what you find.
    </h1>
    <form class="flex mx-auto max-w-xl gap-x-2 px-2" @submit.prevent="fetchMovies(search)">
      <input
        v-model="search"
        type="text"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        placeholder="Search By Title"
      />
      <button
        type="submit"
        class="rounded-md bg-red-700 hover:bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm"
      >
        Search
      </button>
    </form>

    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        Showing {{ movies.length }}/{{ totalMovies }} Results
      </h2>
      <div class="border-b border-black/9 w-full"></div>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="movie in movies" :key="movie.imdbID" class="group relative">
          <div
            class="min-h-96 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none md:h-96"
          >
            <img
              :src="hasPoster(movie.Poster) ? movie.Poster : '/src/assets/placeholder.png'"
              :alt="movie.Title"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ movie.Title }}
              </h3>
            </div>
            <p class="text-sm font-medium text-gray-900 pl-8">
              {{ movie.Year }}
            </p>
          </div>
          <p class="my-2 text-xs">
            <span class="bg-slate-300 rounded-full px-3 py-1">
              {{ movie.Type.toUpperCase() }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <button
      v-if="movies.length && movies.length < totalMovies && search"
      class="rounded-md bg-red-700 hover:bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm mx-auto max-w-xl flex gap-x-2 mb-10"
      @click="fetchMoreMovies(search)"
    >
      Load More
    </button>

    <div
      v-if="errorMessage"
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center"
    >
      <p>Unfortuntely, there isn't any content to display.</p>
      <p>{{ errorMessage }}</p>
      <p>{{ getSuggestion(errorMessage) }}</p>
    </div>

    <div
      v-if="!movies.length && !errorMessage"
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-2xl text-gray-900 text-center">Start by using the search box above.</h2>
    </div>
  </main>
</template>

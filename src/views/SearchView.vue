<script lang="ts">
import { defineComponent } from 'vue'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Rated: string
  Poster: string
  Type: string
  totalSeasons: string
  Genre: string
  Released: string
}

export default defineComponent({
  data: () => ({
    search: '',
    movies: null as Movie[] | null,
    noValue: 'N/A',
    testMovies: [
      {
        Title: 'Duck Dodgers in the 24½th Century',
        Year: '1953',
        Rated: 'Approved',
        Released: '25 Jul 1953',
        Runtime: '7 min',
        Genre: 'Animation, Short, Comedy',
        Director: 'Chuck Jones',
        Writer: 'Michael Maltese',
        Actors: 'Mel Blanc',
        Plot: 'Space hero Duck Dodgers, along with Eager Young Space Cadet Porky, travel to Planet X in search of Illudium Phosdex, the shaving cream atom. Unfortunately, Commander X-2 arrives in his "Martian Maggot" spaceship with his own designs on the place.',
        Language: 'English',
        Country: 'United States',
        Awards: '1 nomination',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BZDk1NjQwY2QtODBiNi00NzYzLWJjMDItZGVhNTM3MjdlY2IzXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
        Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
        Metascore: 'N/A',
        imdbRating: '8.1',
        imdbVotes: '6,211',
        imdbID: 'tt0045709',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: '$14,753',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True'
      },
      {
        Title: 'You(th)',
        Year: '2020',
        Rated: 'N/A',
        Released: '23 Mar 2020',
        Runtime: '3 min',
        Genre: 'Short, Drama',
        Director: 'Dylan Olmstead',
        Writer: 'Dylan Olmstead',
        Actors: 'Bobby Coston, Jocorey Giddens, Trevion Jackson, Jeramiah',
        Plot: 'N/A',
        Language: 'English',
        Country: 'USA',
        Awards: 'N/A',
        Poster: 'N/A',
        Ratings: [],
        Metascore: 'N/A',
        imdbRating: 'N/A',
        imdbVotes: 'N/A',
        imdbID: 'tt11284720',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True'
      },
      {
        Title: 'The Walking Dead',
        Year: '2010–2022',
        Rated: 'TV-MA',
        Released: '31 Oct 2010',
        Runtime: '44 min',
        Genre: 'Drama, Horror, Thriller',
        Director: 'N/A',
        Writer: 'Frank Darabont',
        Actors: 'Andrew Lincoln, Norman Reedus, Melissa McBride',
        Plot: "Sheriff Deputy Rick Grimes gets shot and falls into a coma. When awoken he finds himself in a Zombie Apocalypse. Not knowing what to do he sets out to find his family, after he's done that, he gets connected to a group to become the leader. He takes charge and tries to help this group of people survive, find a place to live and get them food. This show is all about survival, the risks and the things you'll have to do to survive.",
        Language: 'English',
        Country: 'United States',
        Awards: 'Won 2 Primetime Emmys. 83 wins & 236 nominations total',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BZmU5NTcwNjktODIwMi00ZmZkLTk4ZWUtYzVjZWQ5ZTZjN2RlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
        Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
        Metascore: 'N/A',
        imdbRating: '8.1',
        imdbVotes: '1,016,735',
        imdbID: 'tt1520211',
        Type: 'series',
        totalSeasons: '11',
        Response: 'True'
      }
    ]
  }),

  methods: {
    searchMovies() {
      // Make get request
      console.log(this.search)
    },

    hasPoster(poster: string) {
      return poster !== this.noValue
    },

    hasRated(rated: string) {
      return rated !== this.noValue
    }
  }
})
</script>

<template>
  <main>
    <form class="flex mx-auto mt-16 max-w-xl sm:mt-15 gap-x-2" @submit.prevent="searchMovies()">
      <input
        v-model="search"
        type="text"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        placeholder="Search"
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
        Results ({{ testMovies.length }})
      </h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="movie in testMovies" :key="movie.imdbID" class="group relative">
          <div
            class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
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
            <p v-if="hasRated(movie.Rated)" class="text-sm font-medium text-gray-900">
              {{ movie.Rated }}
            </p>
            <p>
              type: {{ movie.Type }} <span>seasons: {{ movie.totalSeasons }}</span>
            </p>
            <p>genre: {{ movie.Genre }}</p>
            <p>released: {{ movie.Released }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { useMovieStore } from '@/stores/movie'
import { defineComponent } from 'vue'
import { format } from 'date-fns'
import type { SearchHistory } from '@/types/search'

export default defineComponent({
  filters: {
    formatDate(value: Date) {
      return format(value, 'MMMM d, yyyy - h:mm a')
    }
  },

  computed: {
    history(): SearchHistory[] {
      return this.movieStore.history
    },
    ...mapStores(useMovieStore)
  },

  methods: {
    formatDate(date: Date) {
      return format(date, 'MMMM d, yyyy - h:mm a')
    }
  }
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Search History</h2>

    <section v-if="history.length" class="mt-6">
      <div v-for="(record, index) in history" :key="index" class="py-2">
        <div
          class="border border-slate-300 shadow-sm rounded-lg p-5 flex justify-between items-center"
        >
          <div>
            <p class="font-bold">{{ formatDate(record.dateTime) }}</p>
            <p class="pl-5">
              Search Term: <em class="text-slate-500">{{ record.searchTerm }}</em>
            </p>
            <p v-if="record.totalResults" class="pl-5">Total Results: {{ record.totalResults }}</p>
          </div>
          <div
            :class="record.successful ? 'text-green-600' : 'text-red-700'"
            class="p-3 rounded-full"
          >
            <svg
              v-if="record.successful"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="mt-6">No search history at this time.</section>
  </div>
</template>

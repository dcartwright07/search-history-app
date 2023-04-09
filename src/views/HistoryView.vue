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
    },

    getTotal(totalResults: number) {
      return totalResults ? totalResults : 0
    }
  }
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Search History</h2>

    <section v-if="history.length" class="mt-6">
      <div class="not-prose relative bg-[#f2f2f2] rounded-lg overflow-hidden">
        <div
          style="background-position: 10px 10px"
          class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
        ></div>
        <div class="relative rounded-lg overflow-auto">
          <div class="border-b overflow-scroll my-8">
            <table class="border-collapse table-auto w-full text-sm">
              <thead>
                <tr>
                  <th class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
                    Date
                  </th>
                  <th class="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
                    Search Term
                  </th>
                  <th class="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                    Total Results
                  </th>
                  <th class="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                    Success
                  </th>
                  <th class="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                    Messages
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="(record, index) in history" :key="index">
                  <td class="border-b border-slate-100 p-4 pl-8 text-slate-500">
                    {{ formatDate(record.dateTime) }}
                  </td>
                  <td class="border-b border-slate-100 p-4 text-slate-500">
                    {{ record.searchTerm }}
                  </td>
                  <td class="border-b border-slate-100 p-4 text-slate-500">
                    {{ getTotal(record.totalResults) }}
                  </td>
                  <td class="border-b border-slate-100 p-4 text-slate-500">
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
                  </td>
                  <td class="border-b border-slate-100 p-4 text-slate-500">
                    {{ record.errorMessage }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="absolute inset-0 pointer-events-none border border-black/5 rounded-lg"></div>
      </div>
    </section>

    <section v-else class="mt-6">No search history at this time.</section>
  </div>
</template>
